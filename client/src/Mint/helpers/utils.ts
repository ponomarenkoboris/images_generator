import request, { endpoints } from "../../http-conf/request"
import { UpdateMachineConfigProps } from "../../store/candyStore/types"

type ActionType = 'get' | 'update' | 'reset'
export const fetchCandyMachine = async (type: ActionType, data?: UpdateMachineConfigProps): Promise<UpdateMachineConfigProps | void> => {
    try {
        if (type === 'get') {
            const { status, data } = await request.get(endpoints.candyMachine)
            if (status === 200 && data.candyConfig) {
                return data.candyConfig
            }
        } else if (type === 'update') {
            const serverRequest = { candyConfig: data, type }
            await request.post(endpoints.candyMachine, serverRequest)
        } else if (type === 'reset') {
            await request.post(endpoints.candyMachine, { type })
        }
    } catch (error) {
        console.error(error)
    }
}