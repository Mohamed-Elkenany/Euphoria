"use client"
import React, { useEffect, useState } from 'react';
import { Rate } from 'antd';
const RateCustomer = ({ rate }) => {
    return (
        <div>
            <Rate allowHalf disabled value={rate} />
        </div>
    );
};
export default RateCustomer;