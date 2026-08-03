import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { loadUnexportedMatches } from "../Database/databaseHandler";
import "./QRCodeDisplay.css";

export default function QRCodeDisplay({ onClose }) {

    const [qrData, setQrData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadData() {

            try {

                const matches = await loadUnexportedMatches();

                // Only include the first 10 unexported matches
                const matchesToSend = matches.slice(0, 10);

                if (matchesToSend.length === 0) {
                    alert("There are no unexported matches.");
                    onClose();
                    return;
                }

                setQrData(
                    JSON.stringify(matchesToSend)
                );

            } catch (error) {

                console.error(
                    "Error loading matches for QR code:",
                    error
                );

                alert("Failed to create QR code.");
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
                            dashboard computer.
                        </p>

                    </>

                )}

            </div>

        </div>

    );

}