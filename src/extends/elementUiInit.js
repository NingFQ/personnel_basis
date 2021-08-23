import Vue from "vue";
import {
  MessageBox,
  Message
} from "element-ui";

Vue.$MessageBox = Vue.prototype.$MessageBox = MessageBox;
Vue.$message = Vue.prototype.$message = Message;


