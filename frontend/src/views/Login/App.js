import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import { grey } from "@material-ui/core/colors";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import theme from "./theme";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import axios from 'axios';
import {Redirect} from 'react-router-dom';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
class LoginPage extends React.Component {


  

  constructor() {
    super();
    this.state = {
        account: '',
        password: '',
        redirectToReferrer: false,
        open: false
    }
  }


  onChange = (event) => {
      this.setState({
          [event.target.name]: event.target.value
      })
  }
  handleClose = () => {
    this.setState({
      open: false
    })
  }


  onHandleLogin = () => {
      axios({
          method: 'POST',
          url: 'https://mighty-plains-90447.herokuapp.com/v1/account/signin',
          headers:{
            'Encriptype': 'multipart/form-data',
          },
          data: {
              account: this.state.account,
              password: this.state.password
          }
      }).then((response) => {
          // if (response.data.role === "admin")
          // {
          //   console.log(response.data);
          //   localStorage.setItem("token", response.data.token);
          //   localStorage.setItem("islogged",true);
          //   // localStorage.setItem("admin_avatar",response.data.user_info[0].avatar)
          //   localStorage.setItem("roleCode", response.data.role);
          //   this.setState({redirectToReferrer:true}); 
          // }
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("islogged",true);
          localStorage.setItem("roleCode", response.data.roleCode);
          localStorage.setItem("id", response.data.id);
          this.setState({redirectToReferrer:true})
          
          // return (<Redirect to={{
          //   pathname : '/admin/dashboard',
          //   state: {redirectToReferrer: true,
          //   }
          // }}/>)

      }).catch((error) => {
        this.setState({
          open: true
        })
        // handle error
        console.log(error);
      });
      
  }
  render(){
    const styles = {
      loginContainer: {
        minWidth: 320,
        maxWidth: 400,
        height: "auto",
        position: "absolute",
        top: "20%",
        left: 0,
        right: 0,
        margin: "auto"
      },
      paper: {
        padding: 20,
        overflow: "auto"
      },
      buttonsDiv: {
        textAlign: "center",
        padding: 10
      },
      flatButton: {
        color: grey[500],
        margin: 5
      },
      checkRemember: {
        style: {
          float: "left",
          maxWidth: 180,
          paddingTop: 5
        },
        labelStyle: {
          color: grey[500]
        },
        iconStyle: {
          color: grey[500],
          borderColor: grey[500],
          fill: grey[500]
        }
      },
      loginBtn: {
        float: "right"
      },
      btn: {
        background: "#4f81e9",
        color: "white",
        padding: 7,
        borderRadius: 2,
        margin: 2,
        fontSize: 13
      },
      btnFacebook: {
        background: "#4f81e9"
      },
      btnGoogle: {
        background: "#e14441"
      },
      btnSpan: {
        marginLeft: 5
      }
    };
  
    if (this.state.redirectToReferrer) {
      if (parseInt(localStorage.getItem("roleCode"), 10) < 2) {
        return (<Redirect to={{
          pathname : '/admin/items',
          state: {redirectToReferrer: true,
          }
        }}/>)
      }
      else {
        return (<Redirect to={{
          pathname : '/admin/dashboard',
          state: {redirectToReferrer: true,
          }
        }}/>)
      }
    }
    return (
      <ThemeProvider theme={theme}>
        <div>
          <div style={styles.loginContainer}>
            <Paper style={styles.paper}>
              <form>
                <InputLabel htmlFor="component-simple">Tài khoản</InputLabel>
                <Input type="account" placeholder="Account" fullWidth={true} onChange={this.onChange} name='account' value={this.state.account} />
                <div style={{ marginTop: 16 }}>
                <InputLabel htmlFor="component-simple">Mật khẩu</InputLabel>
                <Input type="password" placeholder="Password..." fullWidth={true} onChange={this.onChange} name='password' value={this.state.password} />
                </div>

                <div style={{ marginTop: 10 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        label="Lưu mật khẩu"
                        style={styles.checkRemember.style}
                        labelStyle={styles.checkRemember.labelStyle}
                        iconStyle={styles.checkRemember.iconStyle}
                      />
                    }
                    label="Lưu mật khẩu"
                  />
                    <Button variant="contained" color="primary" style={styles.loginBtn} onClick={this.onHandleLogin}>
                      Đăng nhập
                    </Button>
                </div>
              </form>
            </Paper>
          </div>
        </div>
        <Dialog
            open={this.state.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
        <DialogTitle id="alert-dialog-slide-title">
          {"Đăng nhập thất bại!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Mật khẩu không chính xác !
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            OK
          </Button>
        </DialogActions>
        </Dialog>
      </ThemeProvider>
    );
  }
};


export default LoginPage;
