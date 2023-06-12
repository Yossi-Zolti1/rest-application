import OrderDB from "../../../config/models/orders.js";

class OrderModel {
    constructor() { }

    // handle create order
    static async saveNewOrder(order, tableId, restId) {

        const createdOrder = [];
        const randomNumber = generateRandomNumber();

        for (const row of order) {

            const newRow = await OrderDB.create({
                orderId: randomNumber,
                itemId: row.itemId,
                quantity: row.quantity,
                price: row.price,
                restId: restId,
                tableId: tableId,
            });

            createdOrder.push(newRow);
        }
        return createdOrder;
    }



}
export default OrderModel;

function generateRandomNumber() {
    const min = 1000000000; // Minimum value for a 10-digit number
    const max = 9999999999; // Maximum value for a 10-digit number
    return Math.floor(Math.random() * (max - min + 1) + min);
  }