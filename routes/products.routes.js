const router = require("./user.routes");


router.get('/create', async (req, res)=>{
    try{
        const product = await Product.find();
            res.status(201).json({product:product});

    }catch(err){
        console.error(err);
        res.status(500).json({message: 'Internal Server Error'});
    }
})

router.put('/updateProduct/:id', async (req, res)=>{
    try{
        const product = await Product.find({_id:req.params.id});
        if(!product){
            return res.status(404).json({message: 'Product not found'});
        }
            const updateProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            });
    
            if (!updateProduct) {
                return res.status(404).json({ message: 'Product not found for update' });
            }
    
            res.status(200).json({ message: 'Product updated successfully', product: updateProduct });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    });