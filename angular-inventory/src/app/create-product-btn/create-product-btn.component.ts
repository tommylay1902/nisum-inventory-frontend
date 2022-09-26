import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ProductService } from 'src/shared/services/product.service';



@Component({
  selector: 'app-create-product-btn',
  templateUrl: './create-product-btn.component.html',
  styleUrls: ['./create-product-btn.component.css']
})
export class CreateProductBtnComponent implements OnInit {
  errorMessage: any = "error";
  products: any[] = [];

  constructor( private ps:ProductService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.ps.getProducts().subscribe((products) => {
      console.table(products);
      this.products = products;
    });
  }

 
  upcValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {

      const value = control.value;
      
      const inRange = /^\d{12}$/.test(value);

      console.log(value)
  

      if(inRange){
          if(this.products.find(p => p.upc == value)){
            console.log("UPC already exists");
            return {notValidUPC: true};
          }
          else{
            console.log("The validation has passed");
            return null;
          }
      }
      else{
        console.log("The upc is not 12 digits");
        return {notValidUPC: true};
      }

    }
  }

  addProductForm = this.formBuilder.group({
    upc :  ['', [Validators.required, this.upcValidator()] ],
    prodName  : ['', Validators.required],
    brand : ['', Validators.required],
    prodDesc  : ['', Validators.required],
    category  : ['', Validators.required],
    pricePerUnit  : ['', [Validators.required, Validators.pattern("^[0-9]+(\.[0-9][0-9])?$")]],
    imageURL  : '',
    availableStock  : ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
    reservedStock : ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
    shippedStock : ['', [Validators.required, Validators.pattern("^[0-9]*$")]]
  });

  product = {};

  onSubmit(): void{
    if(!this.addProductForm.valid){
      console.log("Form is invalid");
      
    }
    else {
      

      if (window.confirm("Do you really want to create this product?")) {
        this.product = this.addProductForm.value;
        console.log(this.product);
        this.productCreation();
        window.location.reload();

      }
    }
    
    
  }

  productCreation(){
    this.ps.createProduct(this.product).subscribe({
      next: () => this.onSaveComplete(),
      error: err => this.errorMessage = err
    })
  }

  onSaveComplete(): void {
    console.log("product has been sent to backend");
    this.product = {};
    this.addProductForm.reset();
    this.closePopup();

  }

  displayStyle = "none";
  
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

  

}