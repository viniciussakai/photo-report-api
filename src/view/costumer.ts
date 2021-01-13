import { Costumer } from '@models/Costumer'
import { renderAdress } from './address'

export const renderCostumer = (costumer:Costumer | undefined) => {
	if (!costumer) return

	return {
		id: costumer.id,
		name: costumer.name,
		document: costumer.document,
		fantasyName: costumer.fantasyName,
		email: costumer.email,
		phone: costumer.phone,
		address: renderAdress(costumer.address),
		createdAt: costumer.createdAt,
		updatedAt: costumer.updatedAt
	}
}

export const renderManyCostumer = (costumers: Costumer[]) => {
	return costumers.map(costumer =>
		renderCostumer(costumer)
	)
}
