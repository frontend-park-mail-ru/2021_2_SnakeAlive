import { wsUpdate } from "@/actions/trip";
import { paramsURLfrontend, pathsURLfrontend } from "@/constants";
import { WSEndPoint } from "@/constants/endpoints";
import { dispatcher } from "@/dispatcher";
import { router } from "@/router";
import { createFrontendQueryParams } from "@/router/router";
import { storage } from "@/storage";

export default class WS {
    private connect!: WebSocket;
    private url: string;

    constructor(wsURL: string) {
        this.url = wsURL;
    }

    async Connect() {
        this.connect = new WebSocket(this.url);
    }

    set onmessage(onmessage) {
        this.connect.onmessage = onmessage;
    }

}


const ws = new WS(WSEndPoint);

export const NewWSConnect = () => {
    return ws.Connect()
};

export const initWS = () => {
    ws.onmessage = function (response) {
        const message = JSON.parse(response.data);
        message.date = new Date(message.date);
            router.go(
				createFrontendQueryParams(pathsURLfrontend.trip, [
					{
						key: paramsURLfrontend.id,
						value: storage.getCurrentTrip().id,
					},
				])
          
			);
    };
};

export const createWSCon = (): void =>{
	setTimeout(function(){ 
		if (storage.getCurrentTrip().users.length > 1){
			NewWSConnect().then(initWS)
				.catch((err) => {
					console.log(err);
				});
		}
	},300);
}