import {makeStyles} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
export const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
      marginLeft: "25px",
      marginRight: "25px",
      color: "black", marginBottom: theme.spacing(2)
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
    tituloProduto:{ color:"black",textDecoration:"none"},brand:{
      fontSize:theme.spacing(2),
      color:"black",
    }
  }));