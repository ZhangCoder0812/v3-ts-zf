import { IHomeState } from "@/typings/home";
import { createStore } from "vuex";

import home from "./modules/home";

// export interface IGlobalState {
//   home: IHomeState;
// }

export interface IGlobalState {
    home: IHomeState;
}

export default createStore<IGlobalState>({
    mutations: {},
    actions: {},
    modules: { home },
});
