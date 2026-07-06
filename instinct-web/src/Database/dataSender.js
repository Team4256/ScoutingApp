import axios from "axios";

export async function sendDataToServer(data) {
  try {
    const response = await axios.post("http://localhost:3000/match", data);
    console.log("Data sent successfully:", response.data);
  } catch (error) {
    console.error("Error sending data:", error);
  }
}