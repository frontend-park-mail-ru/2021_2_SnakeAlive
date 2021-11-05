import BasicView from "@/view/view";
import {Token} from "@/dispatcher";

export default class ProfileView  extends BasicView {
    #tokens: Token[];

    constructor() {
        super();
    }
}