import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { loadUnexportedMatches, loadUnexportedAllianceData, loadUnexportedPitData } from "../Database/databaseHandler";
import "./QRCodeDisplay.css";

export default function QRCodeDisplay({ onClose }) {

    const [qrData, setQrData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {

            try {

                const individualMatches = await loadUnexportedMatches();
                const allianceMatches = await loadUnexportedAllianceData();
                const pitMatches = await loadUnexportedPitData();


                /* Maximum of 10 total records so qr code fits */

                const individual = individualMatches.map(
                        match => ({
                            type: "individual",
                            data: match

                        })
                    );


                const alliance = allianceMatches.map(
                        alliance => ({
                            type: "alliance",
                            data: alliance

                        })
                    );

                const pit = pitMatches.map(
                        pit => ({
                            type: "pit",
                            data: pit

                        })
                    );


                const combined = [
                    ...individual,
                    ...alliance,
                    ...pit

                ];


                const dataToSend = combined.slice(0, 10);


                if (dataToSend.length === 0) {
                    alert( "There are no unexported matches." );
                    onClose();
                    return;

                }


                /* QR payload */

                const qrPayload = {
                    type: "scouting-data",
                    version: 1,
                    records: dataToSend

                };


                setQrData(JSON.stringify(qrPayload));


            } catch (error) {

                console.error("Error loading data for QR code:", error);
                alert("Failed to create QR code");

                onClose();

            } finally {
                setLoading(false);

            }

        }

        loadData();

    }, [onClose]);


    return (

        <div className="qr-overlay">

            <div className="qr-modal">

                {/* Close button */}

                <button
                    className="qr-close-button"
                    onClick={onClose}
                >
                    ×
                </button>


                <h2>
                    Scan QR Code
                </h2>


                {loading ? (

                    <p>
                        Preparing data...
                    </p>

                ) : (

                    <>
                        <div className="qr-code-container">

                            <QRCode
                                value={qrData}
                                size={350}
                            />

                        </div>

                        <p className="qr-instructions">
                            Scan this code with the
                            dashboard computer
                        </p>

                    </>

                )}

            </div>

        </div>

    );

}