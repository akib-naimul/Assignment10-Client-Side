
import React, { useContext, useEffect, useMemo, useState } from "react";
import useTitle from "../hooks/useTitle";
import { AuthContext } from "../providers/AuthProvider";
import { toast } from "react-hot-toast";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const MyOrders = () => {
  useTitle("My Orders");
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const myOrders = useMemo(
    () =>
      orders.filter(
        (o) =>
          (o.email || "").toLowerCase() ===
          (user?.email || "").toLowerCase()
      ),
    [orders, user]
  );

  useEffect(() => {
    let isMounted = true;

    const loadOrders = async () => {
      try {
        const res = await fetch(`${API_BASE}/orders`);
        const data = await res.json();
        if (!isMounted) return;
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        if (isMounted) toast.error("Failed to load orders");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadOrders();

    return () => {
      isMounted = false;
    };
  }, []);

  const downloadPDF = () => {
    if (myOrders.length === 0) {
      toast("No orders to export.");
      return;
    }

    const doc = new jsPDF();
    doc.text("PawMart - My Orders Report", 14, 16);

    const rows = myOrders.map((o) => [
      o.productName,
      o.buyerName,
      o.price,
      o.quantity,
      o.address,
      o.date,
      o.phone,
    ]);

    autoTable(doc, {
      startY: 22,
      head: [
        [
          "Product/Listing",
          "Buyer",
          "Price",
          "Qty",
          "Address",
          "Date",
          "Phone",
        ],
      ],
      body: rows,
    });

    doc.save("pawmart-my-orders.pdf");
  };

  if (loading) {
    return (
      <div className="min-h-[40vh] grid place-items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
        <h1 className="text-3xl font-bold">My Orders</h1>
        <button onClick={downloadPDF} className="btn btn-outline btn-sm">
          Download Report (PDF)
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Product/Listing Name</th>
              <th>Buyer</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Address</th>
              <th>Date</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {myOrders.map((o) => (
              <tr key={o._id}>
                <td>{o.productName}</td>
                <td>{o.buyerName}</td>
                <td>{o.price}</td>
                <td>{o.quantity}</td>
                <td>{o.address}</td>
                <td>{o.date}</td>
                <td>{o.phone}</td>
              </tr>
            ))}
            {myOrders.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-10 opacity-70">
                  You haven’t placed any orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;