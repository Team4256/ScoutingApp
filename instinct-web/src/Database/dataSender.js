import axios from "axios";

export async function sendDataToServer(data) {
  try {
    const response = await axios.post("https://webhook.site/2a34cf08-7553-4633-9cc3-750ac0bf1efa", data);
    console.log("Data sent successfully:", response.data);
  } catch (error) {
    console.error("Error sending data:", error);
  }
}