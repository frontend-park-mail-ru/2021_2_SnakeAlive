import BasicView from "@/view/view";
import {DataType, dispatcher, EventType, Token} from "@/dispatcher";
import {Input} from "@/components";
import {newUpdateProfileMetadataRequest, newUpdateProfilePhotoRequest} from "@/actions";
import {storage} from '@/storage';
import {Profile} from "@/models/profile";


export default class ProfileView extends BasicView {
    #tokens: Token[];

    constructor() {
        super('#content');

        this.#tokens = [];

        // add callbacks for buttons
    }

    init = () => {
        this.#tokens = [
            dispatcher.register(EventType.GET_PROFILE_RESPONSE, this.renderProfile),
            dispatcher.register(EventType.DESTROY_CURRENT_PAGE_REQUEST, this.destroy),
        ];
    }

    destroy = (metadata: DataType): void => {
        this.#tokens.forEach(element => {
            dispatcher.unregister(element);
        });

        this.setEmpty();
    };

    renderProfile = (metadata: DataType): void => {
        const profile: Profile = storage.getProfile()

        // set the fucking render bitch!
    }

    #uploadFile = (): void => {
        const fileInput = <HTMLInputElement>document.querySelector("#profileImageInput")
        const uploadFile = new FormData()
        // @ts-ignore
        uploadFile.append(fileInput.files[0].name, fileInput.files[0])

        dispatcher.notify(newUpdateProfilePhotoRequest(uploadFile));
    }

    #updateProfile = (values: { [key: string]: string }): void => {
        const {name, surname, email, password} = values;
        dispatcher.notify(newUpdateProfileMetadataRequest(name, surname, email, password));
    }
}