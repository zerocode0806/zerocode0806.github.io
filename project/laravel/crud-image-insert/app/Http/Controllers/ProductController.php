<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;
use App\Models\Product;

class ProductController extends Controller
{
    public function index() {
        $products = Product::orderBy('created_at', 'DESC')->get();

        return view('products.list',[
            'products' => $products
        ]);
        
    }

    public function create() {
        return view('products.create');
    }

    public function store(Request $request) {
        $rules = [
            'name' => 'required|min:5',
            'sku' => 'required|min:3',
            'price' => 'required|numeric',
        ];

        if ($request->image != "") {
            $rules['image'] = 'image';
        }

        $validator = Validator::make($request->all(),$rules);

        if ($validator->fails()) {
            return redirect()->route('products.create')->withInput()->withErrors($validator);
        }

        //store valueu to database
        $product = new Product();
        $product->name = $request->name;
        $product->sku = $request->sku;
        $product->price = $request->price;
        $product->description = $request->description;
        $product->save();

        if ($request->image != "") {
            //store image
            $image = $request->image;
            $ext = $image->getClientOriginalExtension();
            $imageName = time().'.'.$ext;//unique image name

            //image upload path
            $image->move(public_path('uploads/products'),$imageName);

            //save image name in database
            $product->image = $imageName;
            $product->save();
        }

        return redirect()->route('products.index')->with('succes','Product added succesfully');
    }

    public function edit($id) {
        $product = Product::findOrFail($id);
        return view('products.edit',[
            'product' => $product
        ]);
    }

    public function update($id, Request $request) {
        $product = Product::findOrFail($id);
        $rules = [
            'name' => 'required|min:5',
            'sku' => 'required|min:3',
            'price' => 'required|numeric',
        ];

        if ($request->image != "") {
            $rules['image'] = 'image';
        }

        $validator = Validator::make($request->all(),$rules);

        if ($validator->fails()) {
            return redirect()->route('products.edit', $product->id)->withInput()->withErrors($validator);
        }

        //store valueu to database
        $product->name = $request->name;
        $product->sku = $request->sku;
        $product->price = $request->price;
        $product->description = $request->description;
        $product->save();

        if ($request->image != "") {
            //delete old image
            File::delete(public_path('uploads/products/'.$product->image));

            //store image
            $image = $request->image;
            $ext = $image->getClientOriginalExtension();
            $imageName = time().'.'.$ext;//unique image name

            //image upload path
            $image->move(public_path('uploads/products'),$imageName);

            //save image name in database
            $product->image = $imageName;
            $product->save();
        }

        return redirect()->route('products.index')->with('succes','Product updated succesfully');
    }

    public function destroy($id) {
        $product = Product::findOrFail($id);

        //delete image
        File::delete(public_path('uploads/products/'.$product->image));

        //delete product data
        $product->delete();

        return redirect()->route('products.index')->with('succes','Product deleted succesfully');
    }
}
