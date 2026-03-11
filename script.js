document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('insurance-form');
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');
    const dataOutput = document.getElementById('dataOutput');
    const buyAnotherBtn = document.getElementById('buyAnotherBtn');
    const summaryProduct = document.getElementById('summary-product');
    const summaryPrice = document.getElementById('summary-price');
    const productRadios = document.querySelectorAll('input[name="product"]');

    productRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.value.includes('86.000')) {
                summaryProduct.textContent = 'Bảo hiểm TNDS Bắt buộc + Tự nguyện (1 Năm)';
                summaryPrice.textContent = '86.000 đ';
            } else {
                summaryProduct.textContent = 'Bảo hiểm TNDS Bắt buộc (1 Năm)';
                summaryPrice.textContent = '66.000 đ';
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Custom form validation and submission handling
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent page reload

        if (form.checkValidity()) {
            // Disable button to prevent double submission
            submitBtn.disabled = true;
            submitBtn.innerText = 'Đang xử lý...';

            // Gather data from the form
            const formData = new FormData(form);
            const customerData = {
                plateNumber: formData.get('plateNumber'),
                chassisNumber: formData.get('chassisNumber'),
                engineNumber: formData.get('engineNumber'),
                fullName: formData.get('fullName'),
                identityNumber: formData.get('identityNumber'),
                address: formData.get('address'),
                phoneNumber: formData.get('phoneNumber'),
                email: formData.get('email'),
                product: formData.get('product')
            };

            // In a real app, you would send this to your backend via fetch()
            // For Phase 1 (Manual input), we will display the data clearly for the Admin to copy.
            
            // Format the data into a clean text block that's easy to copy
            const formattedData = `[ĐƠN HÀNG MỚI]
Họ tên: ${customerData.fullName}
CCCD: ${customerData.identityNumber}
Địa chỉ: ${customerData.address}
SĐT: ${customerData.phoneNumber}
Email: ${customerData.email}

[THÔNG TIN XE]
Biển số: ${customerData.plateNumber}
Số khung: ${customerData.chassisNumber}
Số máy: ${customerData.engineNumber}

[SẢN PHẨM]
Gói: ${customerData.product}`;

            // Send data to Google Sheets via Webhook
            const scriptURL = 'https://script.google.com/macros/s/AKfycbwtI6f4tnDEV33-3xQ9_Ethn_Bp5rGg1LtltchfPPsmDcztZRYBCZMIPB_LluAOx0ZE/exec';

            fetch(scriptURL, { 
                method: 'POST', 
                body: new FormData(form) // Send the raw form data
            })
            .then(response => {
                // Hide the form fields to keep UI clean
                Array.from(form.children).forEach(child => {
                    if(child.id !== 'successMessage') {
                        child.style.display = 'none';
                    }
                });

                // Show success message and the formatted data
                dataOutput.textContent = formattedData;
                successMessage.classList.remove('hidden');
                
                // Scroll to the success message
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            })
            .catch(error => {
                console.error('Lỗi khi gửi dữ liệu:', error);
                alert("Đã xảy ra lỗi mạng. Vui lòng thử lại!");
                submitBtn.disabled = false;
                submitBtn.innerText = 'Xác nhận thông tin & Yêu cầu mã QR';
            });

        } else {
            // If the form is invalid, the browser will show default tooltips,
            // but we ensure the CSS :invalid pseudo-class kicks in.
            form.reportValidity();
        }
    });

    // Handle "Buy Another Vehicle" button click
    if (buyAnotherBtn) {
        buyAnotherBtn.addEventListener('click', () => {
            // 1. Reset specific vehicle fields
            document.getElementById('plateNumber').value = '';
            document.getElementById('chassisNumber').value = '';
            document.getElementById('engineNumber').value = '';

            // 2. Hide success message
            successMessage.classList.add('hidden');

            // 3. Show the form fields again
            Array.from(form.children).forEach(child => {
                if(child.id !== 'successMessage') {
                    child.style.display = '';
                }
            });

            // 4. Reset submit button state
            submitBtn.disabled = false;
            submitBtn.innerText = 'Xác nhận thông tin & Yêu cầu mã QR';

            // 5. Scroll back smoothly to the specific vehicle information area
            const vehicleInfoTitle = Array.from(document.querySelectorAll('.form-group-title')).find(el => el.textContent.includes('Thông Tin Xe'));
            if (vehicleInfoTitle) {
                vehicleInfoTitle.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                form.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }
});
