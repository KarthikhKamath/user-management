import React, { useState, useEffect } from 'react';
import CustomerList from "./components/CustomerList";
import CustomerDetails from './components/CustomerDetails';
import users from './users.json'; // Import the JSON data
import "./App.css";

interface Customer {
    id: string;
    name: string;
    title: string;
    address: string;
}

const App: React.FC = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [isCustomerListVisible, setIsCustomerListVisible] = useState<boolean>(true); // State to track visibility

    useEffect(() => {
        setCustomers(users);
    }, []);

    useEffect(() => {
        setSelectedCustomer(customers[1]);
    }, [customers]);

    useEffect(() => {
        const body = document.body;
        if (isCustomerListVisible) {
            body.classList.add('no-scroll');
        } else {
            body.classList.remove('no-scroll');
        }
    }, [isCustomerListVisible]);

    const handleSelectCustomer = (customer: Customer) => {
        setSelectedCustomer(customer);
    };

    const handleToggleCustomerList = () => {
        setIsCustomerListVisible(!isCustomerListVisible);
    };

    return (
        <div className="app-container">
            <button className="toggle-button" onClick={handleToggleCustomerList}>
                {isCustomerListVisible ? 'Hide' : 'Show'}
            </button>
            {isCustomerListVisible && (
                <div className="customer-list">
                    <CustomerList
                        customers={customers}
                        onSelectCustomer={handleSelectCustomer}
                        selectedCustomerId={selectedCustomer?.id}
                    />
                </div>
            )}
            <div className={isCustomerListVisible ? "details-with-sidebar" : "details-full-width"}>
                {selectedCustomer && (
                    <CustomerDetails key={selectedCustomer.id} customer={selectedCustomer} />
                )}
            </div>
        </div>
    );
};

export default App;
