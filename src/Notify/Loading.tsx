import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';


const Loading = () => {
    const [data, setData] = useState(true);

    setTimeout(() => {
        setData(false);
    }, 1500);

    return (
        <div>
            {
                data
                    ?
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                    : null
            }

        </div>
    )
}

export default Loading;