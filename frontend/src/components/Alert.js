import React from 'react'
import { useSelector } from 'react-redux'

const Alert = () => {

    const alerts = useSelector(state => state.alert)
    
    return(
        alerts !== null && alerts.length > 0 
            && alerts.map(alert => (
                <div className=" w-screen flex flex-col items-center">
                    <div key={alert.id} className="newAlert flex justify-center items-center text-white border-2 border-blue-600 bg-blue-950 rounded-lg w-[300px] h-[50px] ">{alert.msg}</div>
                </div>
            ))
    )
}

export default Alert

