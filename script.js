document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('insurance-form');
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');
    const dataOutput = document.getElementById('dataOutput');

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
                chassisNumber: formData.get('chassisNumber') || 'Không nhập',
                engineNumber: formData.get('engineNumber') || 'Không nhập',
                fullName: formData.get('fullName'),
                identityNumber: formData.get('identityNumber'),
                phoneNumber: formData.get('phoneNumber'),
                email: formData.get('email'),
                product: "TNDS Bắt buộc + Tự nguyện (86.000đ)"
            };

            // In a real app, you would send this to your backend via fetch()
            // For Phase 1 (Manual input), we will display the data clearly for the Admin to copy.
            
            // Format the data into a clean text block that's easy to copy
            const formattedData = `[ĐƠN HÀNG MỚI]
Họ tên: ${customerData.fullName}
CCCD: ${customerData.identityNumber}
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
});
