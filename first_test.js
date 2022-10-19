import "isomorphic-fetch"
import moment from 'moment'
const webex_default_api_key = "MDMwZTJkMzQtMmZkOS00MTg4LTg0MGEtYzRhNDcyNWMwNDcyMjQzMDU0NWQtMWZh_PE93_83163ff1-9c48-440d-9531-7664a5bc3cc6";
const webex_key_prefix = "Bearer ";
const webex_full_key = webex_key_prefix + webex_default_api_key;
const webex_rooms_url = "https://webexapis.com/v1/rooms";
const webex_message_url = "https://webecapis.com/v1/messages";

async function getPos(){
    try{
        const response = await fetch("http://api.open-notify.org/iss-now.json");
        if(!response.ok){
            throw new Error(`Error! status:${response.status}`);
        }
        const myjson = await response.json();
        return myjson;
    } catch(err){console.log(err);}
}

async function getRooms()
{
    try{
        const response = await fetch(webex_rooms_url,{
            method:"GET",
            headers:{
                'Authorization':webex_full_key,
                'Content-Type':'application/json'
            }
        });
        const myjson = await response.json();
        return myjson;
    }catch(err){console.log(err);}
}

const available_rooms = await getRooms();

function findRoom(name){
    for(let i = 0; i < available_rooms.items.length;i++)
    {
        if(name == available_rooms.items[i].title)
        {
            return true;
        }
    }
    return false;
}
async function getMessage(room_name)
{

}
/*const iss_unparsed = await getPos();
const iss_timestamp = iss_unparsed.timestamp;
let d = moment.utc(iss_timestamp*1000).local();
console.log(d.toString());
console.log(iss_unparsed);
*/
console.log(findRoom("My DEVASC SA Room"));