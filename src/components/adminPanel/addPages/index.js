import React, { useEffect, useRef } from "react";

import { CircularProgress } from "@material-ui/core";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { SimpleDataGrid } from "../../SimpleDataGrid";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import {
  setAddEditPagesModalToggle,
  setaddEditPagesModalPages,
} from "../../../store/actions/AddEditPagesModalActions";

import {
  setAllPagesData
} from '../../../store/actions/AdmindataActions'
import { useSnackbar } from "notistack";
import FacebookPagesSelectionModal from "./FacebookPagesSelectionModal";
import _ from "lodash";

import expressConfig from "../../../config/express.json";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  circularProgress: {
    width: 54,
    height: 54,
    margin: "20px auto",
    display: "block",
  },
  facebookMainButton: {
    display: "none",
  },
  
}));

const AddPages = (props) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const GetPages = gql`
    query Pages($mainSuperAdminId:ID!) {
      pages(mainSuperAdminId:$mainSuperAdminId) {
        id
        name
        pageId
        accesstoken
      }
    }
  `;

  let [
    getPages,
    {
      loading: getPagesQueryLoading,
     
      data: getPagesQueryResult,
    },
  ] = useLazyQuery(GetPages, {
    fetchPolicy: "network-only",
  });

  useEffect(()=>{
      if(getPagesQueryResult && getPagesQueryResult.pages){
          props.setAllPagesData(getPagesQueryResult.pages);
      }
  })

  useEffect(() => {
    document.title = "Add/Edit Pages";
    if(!props.allpagesdata.length){

      getPages({
        variables: {
          mainSuperAdminId:JSON.parse(localStorage.getItem("ActiveUserdetail")).mainSuperAdminId
        }
      });
    }
  }, []);

  const DeletePageMutation = gql`
    mutation DeletePage($id: ID!) {
      deletepage(id: $id) {
        success
        error
      }
    }
  `;

  let [deletePage] = useMutation(DeletePageMutation);

  const facebookAuthButtonClickRef = useRef(null);
  const loadingComponent = (
    <div className={classes.circularProgress}>
      <CircularProgress size={24} />
    </div>
  );
  const gridColumns = [
    { title: "Name", field: "name" },
    { title: "Page Id", field: "pageId" },

    { title: "AccessToken", field: "accesstoken" },
  ];
  
  const env = process.env.NODE_ENV || "development";
  const config = expressConfig[env];
  return (
    <>
      {getPagesQueryLoading ? (
        loadingComponent
      ) : (
        <>
          <SimpleDataGrid
            notAllowEdit={true}
            exportFileName={"Pages"}
            onRowDelete={
              props.authSettings && props.authSettings.Pages.Delete_Pages
                ? (oldData) => {
                    return new Promise((resolve, reject) => {
                      deletePage({
                        variables: {
                          id: oldData.id,
                        },
                      })
                        .then(({ data }) => {
                          resolve();
                          if (data.deletepage && data.deletepage.error) {
                            enqueueSnackbar(data.deletepage.error, {
                              variant: "error",
                            });
                          } else {
                            getPages({
                              variables: {
                                mainSuperAdminId:JSON.parse(localStorage.getItem("ActiveUserdetail")).mainSuperAdminId
                              }
                            });
                          }
                        })
                        .catch((e) => {
                          enqueueSnackbar(e, { variant: "error" });
                        });
                    });
                  }
                : null
            }
            onRowUpdateInline={null}
            deleteText={"Are you sure you want to delete this page?"}
            deleteTooltip={"Delete Pages"}
            addTooltip={"Add Page"}
            title={"Pages"}
            onActionAddClick={
              props.authSettings && props.authSettings.Pages.Add_Pages
                ?  (oldData) => {
                
       
                    window.FB.login(
                        (responseLogin) => {
          
                        var longAccessToken = null;
                        if (responseLogin.status === "connected") {
                          axios
                            .get(
                              `https://graph.facebook.com/oauth/access_token?  
                              grant_type=fb_exchange_token&          
                              client_id=${config.facebook_app_id}&
                              client_secret=${config.facebook_app_secret}&
                              fb_exchange_token=${responseLogin.authResponse.accessToken}`
                            )
                            .then((response) => {
                              longAccessToken = response.data.access_token;

                              if (longAccessToken) {
                                window.FB.api(
                                  `/${responseLogin.authResponse.userID}/accounts?access_token=${longAccessToken}`,
                                  (responseAccount) => {
                                    console.log(responseAccount);
                                    if (
                                      responseAccount &&
                                      !responseAccount.error
                                    ) {
                                      responseAccount.data.map((curr)=>
                                      axios.post(
                                        `https://graph.facebook.com/${curr.id}/subscribed_apps?subscribed_fields=messages,messaging_postbacks,message_reads,messaging_payments,message_deliveries,message_echoes,messaging_checkout_updates,standby,messaging_handovers,message_reactions,feed,inbox_labels,messaging_feedback&access_token=${curr.access_token}`
                                    ).then(impres=>console.log(impres))
                                      )
                                      var filterData = responseAccount.data;
                                     
                                      getPagesQueryResult.pages.map((item) => {
                                        filterData = _.filter(
                                          filterData,
                                          (responseData) =>
                                            responseData.id != item.pageId
                                        );
                                      });

                                      props.setaddEditPagesModalPages(
                                        filterData
                                      );
                                      props.setAddEditPagesModalToggle(true);
                                    } else if (
                                      responseAccount &&
                                      responseAccount.error
                                    ) {
                                      enqueueSnackbar(
                                        responseAccount.error.message,
                                        {
                                          variant: "error",
                                        }
                                      );
                                    }
                                  }
                                );
                              }
                            })
                            .catch((error) => {
                              console.log("long lived token error ", error);
                            });
                        }
                 
                      },
                      { scope: "pages_manage_metadata,pages_show_list,pages_messaging,pages_read_engagement" },{ auth_type: 'reauthenticate' }
                    );
                    // FB.login(function (response) {
                    // alert("asda");
                    //});
                    // facebookAuthButtonClickRef.current.click();
                  }
                : null
            }
            columns={gridColumns}
            data={
              getPagesQueryLoading
                ? null
                :props.allpagesdata
                          }
          />
          <FacebookPagesSelectionModal
            onChange={() => {
              getPages({
                variables: {
                  mainSuperAdminId:JSON.parse(localStorage.getItem("ActiveUserdetail")).mainSuperAdminId
                }
              });
            }}
          />
        </>
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  return { ...state.AddEditPagesModalReducer, ...state.AdminDataReducer,...state.AuthReducer };
};

export default connect(mapStateToProps, {
  setAddEditPagesModalToggle,
  setaddEditPagesModalPages,
  setAllPagesData

})(AddPages);
