import OrderModel from '../../models/customers/OrderModel.js';

const SAVE_ERROR = "Failed to save order";

class OrderController {
  constructor() {
  }

  // כרגע לא בשימוש
  static async paymentSuccess(request, response) {
   
    createOrder(request, response)
    
  }
  

  static async createOrder(request, response) {
   
    const { restId, tableId } = request.body[0];
    const orders = request.body[1];

      try {
        const order = await OrderModel.saveNewOrder(orders, tableId, restId);
        response.status(200).json(order);
      } catch (error) {
        console.log(error);
        response.status(400).json({ message: SAVE_ERROR, details: error });
      }
    
  }
   
  
}

export default OrderController;

