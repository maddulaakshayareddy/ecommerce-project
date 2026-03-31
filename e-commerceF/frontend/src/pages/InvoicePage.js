import { jsPDF } from "jspdf";

function InvoicePage() {

const orders = JSON.parse(localStorage.getItem("orders")) || [];
const latestOrder = orders[orders.length - 1];

const downloadInvoice = () => {

const doc = new jsPDF();

doc.setFontSize(18);
doc.text("E-Shop Invoice", 20, 20);

doc.setFontSize(12);

doc.text("Customer Name: " + latestOrder.name, 20, 40);
doc.text("Phone: " + latestOrder.phone, 20, 50);
doc.text("Email: " + latestOrder.email, 20, 60);
doc.text("Address: " + latestOrder.address, 20, 70);

doc.text("Order Date: " + latestOrder.date, 20, 85);

let y = 110;

doc.text("Items:", 20, y);

y += 10;

doc.text("Product", 20, y);
doc.text("Price", 100, y);
doc.text("Qty", 140, y);

y += 10;

latestOrder.items.forEach((item) => {

doc.text(item.name, 20, y);
doc.text("Rs. " + item.price, 100, y);
doc.text(String(item.quantity), 140, y);

y += 10;

});

y += 10;

doc.text("Total Amount: Rs. " + latestOrder.total, 20, y);

doc.save("invoice.pdf");

};

return (

<div style={{textAlign:"center", marginTop:"100px"}}>

<h2>Your Invoice</h2>

<button
onClick={downloadInvoice}
style={{
padding:"12px 25px",
backgroundColor:"#0b2a4a",
color:"white",
border:"none",
borderRadius:"5px",
cursor:"pointer"
}}
>
Download Invoice PDF
</button>

</div>

);

}

export default InvoicePage;