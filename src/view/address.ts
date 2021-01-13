import { Address } from '@models/Address'

export const renderAdress = (address:Address| undefined) => {
	if (!address) return
	return {
		street: address.street,
		number: address.number,
		complement: address.complement,
		neighborhood: address.neighborhood,
		city: address.city,
		state: address.state,
		cep: address.cep,
		createdAt: address.createdAt,
		updatedAt: address.updatedAt
	}
}
