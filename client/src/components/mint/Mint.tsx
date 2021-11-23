import { CandyMachineSetup } from "./machineSetup/CandyMachineSetup"
import { MintNft } from "./mintNft/MintNft"
import useCandyConf from "../../hooks/useCandyConf"
import './Mint.scss'

const txTimeout = 30000

const Mint = () => {
    const machineConf = useCandyConf()

    return (
        <div className='mint__wrapper'>
            <CandyMachineSetup />
            {machineConf && 
                <MintNft 
                    candyMachineId={machineConf.candyMachineId}
                    config={machineConf.config}
                    connection={machineConf.connection}
                    startDate={machineConf.startDateSeed}
                    treasury={machineConf.treasury}
                    txTimeout={txTimeout}
                />
            }
            
        </div>
    )
}

export default Mint