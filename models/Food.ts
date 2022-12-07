import mongoose,  {Schema, Document} from 'mongoose'

interface FoodDoc extends Document {
    vendorId: string;
    name: string;
    description: string;
    category: string;
    foodType: string;
    readyTime: number;
    price: number; 
    rating: number;
    images: []

}

const FoodSchema = new Schema({
    vendorId: {type :String},
    name:{type :String},
    description:{type :String},
    category: {type :String},
    foodType:{type :String},
    readyTime: {type :Number},
    price:{type :Number},
    rating:{type :Number},
    images: [String]

}, {
    toJSON:{
        transform(doc, ret){
            delete ret.__v,
            delete ret.createdAt,
            delete ret.updatedAt
        }
    },
    timestamps: true
})


const Food = mongoose.model<FoodDoc>('food', FoodSchema);

export {Food}