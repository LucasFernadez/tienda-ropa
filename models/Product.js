import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre del producto es obligatorio'],
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    image: {
      type: String,
      default: '',
      trim: true,
    },
    category: {
      type: String,
      enum: ['Camisetas', 'Pantalones', 'Zapatos', 'Accesorios'],
      required: [true, 'La categoría es obligatoria'],
    },
    size: {
      type: String,
      enum: ['XS', 'S', 'M', 'L', 'XL'],
      required: [true, 'La talla es obligatoria'],
    },
    price: {
      type: Number,
      required: [true, 'El precio es obligatorio'],
      min: [0, 'El precio no puede ser negativo'],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Product', productSchema);