import { Box } from '@mui/material'
//
import SearchBar from '../../../../shared/atoms/SearchBar/SearchBar'
import AddButton from '../LeftPanelAddButton/AddButton'
//
import useStyles from './Styles'

const Header: React.FC = () => {
  const { classes } = useStyles()
  // const theme = useTheme()

  const handleSearch = (query: string) => {
    console.log(`Searching for "${query}"...`)
    // perform search logic here
  }

  return (
    <>
      <Box className={classes.headerBox}>
        <SearchBar onSearch={handleSearch} />
        {/* {rightPanelOpened ? <AddButton /> : null} */}
        <AddButton />
      </Box>
    </>
  )
}

export default Header
