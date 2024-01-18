import React from 'react'
import Header from './Header'
import { useTranslation } from 'react-i18next';
    function MyContainer() {
        const {t} = useTranslation();
    
    
        return (
            
        <div>

            <p id="Home page">{t("This is the front page")}.</p>
        </div>
        )

    }

export default MyContainer