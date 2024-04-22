
'use client'
import { AlertCircle } from 'lucide-react';
import './styles.css'
import { Button } from '@/components/ui/button';
export default function ErrorTemplate({ error, reset }) {
    return (
        <main className="error_page">


        

            <div className="error_container">
                <div className="error_header">
                    <AlertCircle />
                    <h2 className="text-center">Looks like something went wrong!</h2>
                </div>
                <div className="error_content">
                    <div className="error_message_container">
                        <span>Error Message:</span>
                        <span className="error_message">{error.message}</span>
                    </div>
                    <div className="error_btn">
                        <Button
                            onClick={() => reset()}>
                            Try again
                        </Button>
                        <Button
                            variant="outline"
                        >home</Button>
                    </div>
                </div>
            </div>

        </main>
    )
}