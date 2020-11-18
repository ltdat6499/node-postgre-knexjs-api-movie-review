import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import AllBook from "../components/Book/get-all";
import CreateBook from "../components/Book/create";
import NotFound from "../components/NotFound";

export default new Router({
     routes: [
          { path: "/", component: AllBook },
          { path: "/book/create", component: CreateBook },
          { path: "*", component: NotFound },
     ],
     mode: "history",
});
