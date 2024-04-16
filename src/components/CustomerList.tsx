import React from 'react';
import "./style.css"

interface Customer {
    id: string;
    name: string;
    title: string;
    address: string;
}

interface CustomerListProps {
    customers: Customer[];
    onSelectCustomer: (customer: Customer) => void;
    selectedCustomerId: string | undefined;
}

const CustomerList: React.FC<CustomerListProps> = ({ customers, onSelectCustomer, selectedCustomerId }) => {
    return (
        <div className="customers-list">
            {customers.map((customer) => (
                <div
                    key={customer.id}
                    className={`customer-card ${customer.id === selectedCustomerId ? 'selected' : ''}`}
                    onClick={() => onSelectCustomer(customer)}
                >
                    <h3>{customer.name}</h3>
                    <p>{customer.title}</p>
                </div>
            ))}
        </div>
    );
};

export default CustomerList;
