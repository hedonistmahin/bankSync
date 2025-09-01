# BankSync - Modern Banking Website

A responsive, modern banking platform built with HTML, CSS, and JavaScript. This project provides a comprehensive banking interface with features for managing accounts, transactions, transfers, and more.

## 🚀 Features

### Core Functionality
- **Dashboard Overview**: Real-time financial overview with charts and statistics
- **Account Management**: View and manage multiple bank accounts
- **Transaction History**: Comprehensive transaction tracking with filtering and sorting
- **Money Transfer**: Secure internal and external money transfers
- **Bank Connection**: Add new bank accounts securely

### User Experience
- **Responsive Design**: Fully responsive across all devices (mobile, tablet, desktop)
- **Modern UI**: Clean, professional interface with smooth animations
- **Accessibility**: WCAG compliant with proper ARIA labels and semantic HTML
- **Form Validation**: Real-time form validation with helpful error messages
- **Loading States**: Visual feedback for all user interactions

### Technical Features
- **Mobile-First Design**: Optimized for mobile devices with touch-friendly interface
- **Progressive Enhancement**: Works without JavaScript, enhanced with it
- **Performance Optimized**: Fast loading with optimized assets
- **Cross-Browser Compatible**: Works on all modern browsers

## 📁 Project Structure

```
banking-website/
├── index.html              # Home page
├── dashboard.html          # Dashboard with charts and stats
├── my-banks.html          # Bank account management
├── transaction-history.html # Transaction history and filtering
├── payment-transfer.html   # Money transfer interface
├── connect-bank.html      # Add new bank accounts
├── styles/
│   ├── main.css           # Main stylesheet
│   └── responsive.css     # Responsive design rules
├── js/
│   ├── main.js            # Core functionality
│   ├── dashboard.js       # Dashboard-specific features
│   ├── banks.js           # Bank management features
│   ├── transactions.js    # Transaction handling
│   └── transfer.js        # Transfer functionality
└── assets/
    ├── icons              # Icon references
    └── images             # Image assets
```

## 🛠️ Setup Instructions

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, for development)

### Installation

1. **Clone or Download** the project files to your local machine

2. **Open the Project**:
   - **Option 1**: Open `index.html` directly in your browser
   - **Option 2**: Use a local server for better development experience

3. **Using a Local Server** (Recommended):
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

4. **Access the Website**:
   - Navigate to `http://localhost:8000` in your browser
   - The website will load with all features functional

## 📱 Responsive Design

The website is fully responsive and optimized for:

- **Mobile Devices** (320px - 768px)
  - Collapsible mobile menu
  - Touch-friendly buttons and forms
  - Optimized layouts for small screens

- **Tablets** (768px - 1024px)
  - Adaptive grid layouts
  - Balanced content distribution

- **Desktop** (1024px+)
  - Full-featured interface
  - Multi-column layouts
  - Enhanced hover effects

## 🎨 Design System

### Color Palette
- **Primary Blue**: #2563eb (Brand color)
- **Success Green**: #10b981 (Positive actions)
- **Error Red**: #ef4444 (Errors and warnings)
- **Neutral Gray**: #64748b (Text and borders)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700
- **Responsive sizing** for optimal readability

### Components
- **Cards**: Consistent card design with shadows and hover effects
- **Buttons**: Primary, secondary, and danger button variants
- **Forms**: Styled form inputs with validation states
- **Navigation**: Responsive navigation with active states

## 🔧 Customization

### Adding New Pages
1. Create a new HTML file following the existing structure
2. Include the standard header and navigation
3. Add your content within the `main-content` section
4. Link to the new page in the navigation

### Modifying Styles
- **Main styles**: Edit `styles/main.css`
- **Responsive rules**: Edit `styles/responsive.css`
- **Component-specific styles**: Add to the appropriate CSS file

### Adding JavaScript Features
- **Global functions**: Add to `js/main.js`
- **Page-specific features**: Create new JS files and include them in the HTML

## 🌟 Key Features Explained

### Mobile Menu
- Automatically appears on screens smaller than 768px
- Hamburger menu button with smooth animations
- Closes when clicking outside or on navigation links

### Form Validation
- Real-time validation with visual feedback
- Custom error messages for different field types
- Success states for valid inputs

### Chart Visualization
- Custom canvas-based charts for spending overview
- Responsive chart sizing
- Interactive legends and labels

### Data Export
- CSV export for transaction history
- JSON export for dashboard data
- Automatic file downloads

## 🔒 Security Considerations

This is a frontend demonstration project. In a production environment, you would need:

- **Backend API**: Secure server-side processing
- **Authentication**: User login and session management
- **Data Encryption**: Secure transmission of sensitive data
- **Input Sanitization**: Server-side validation and sanitization
- **HTTPS**: Secure communication protocol

## 🐛 Troubleshooting

### Common Issues

1. **Styles not loading**:
   - Check file paths in HTML files
   - Ensure CSS files are in the correct directory

2. **JavaScript not working**:
   - Check browser console for errors
   - Verify JavaScript files are properly linked

3. **Mobile menu not appearing**:
   - Ensure viewport meta tag is present
   - Check responsive CSS is loaded

4. **Forms not validating**:
   - Check that main.js is loaded
   - Verify form structure matches expected format

### Browser Compatibility
- **Chrome**: 60+
- **Firefox**: 55+
- **Safari**: 12+
- **Edge**: 79+

## 📈 Performance Tips

1. **Optimize Images**: Use appropriate image formats and sizes
2. **Minimize HTTP Requests**: Combine CSS and JS files
3. **Enable Compression**: Use gzip compression on your server
4. **Cache Resources**: Set appropriate cache headers
5. **Lazy Loading**: Implement lazy loading for images

## 🤝 Contributing

To contribute to this project:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly across different devices
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

For support or questions:
- Check the troubleshooting section above
- Review the code comments for implementation details
- Open an issue for bugs or feature requests

---

**Note**: This is a demonstration project for educational purposes. It does not handle real financial transactions or store sensitive banking information. 
