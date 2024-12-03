# RBAC-System
A **Role-Based Access Control (RBAC)** system with features for managing users, roles, and permissions. This project utilizes localStorage for data persistence and is designed with a modular structure for scalability and maintainability.

---

## Features

1. **User Management**:
   - Create, edit, and delete users.
   - Assign roles to users.

2. **Role Management**:
   - Create, edit, and delete roles.
   - Assign permissions to roles.

3. **Permission Management**:
   - Create, edit, and delete custom permissions.
   - Unlimited permission creation for granular access control.

4. **Dashboard**:
   - Graphical representation of active users and roles.
   - Charts for:
     - User vs. Status
     - User vs. Roles

---

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: Ensures type safety and reduces runtime errors.
- **Zustand**: Lightweight state management for React applications.
- **CSS**: For custom styling.
- **localStorage**: Browser storage for persisting application data.

---

## Project Structure

The project follows a modular structure to maintain scalability and reusability:

```plaintext
src/
├── components/               # Reusable UI components
│   ├── layout/               # Layout-related components
│   │   └── side-navbar.tsx
│   ├── modals/               # Modal components for CRUD operations
│   │   ├── delete-modal.tsx
│   │   ├── permission-modal.tsx
│   │   ├── role-modal.tsx
│   │   └── user-modal.tsx
│   ├── ui/                   # UI-specific reusable components
│   │   ├── dropdown-menu.tsx
│   │   ├── scroll-area.tsx
│   │   ├── select.tsx
│   │   └── table.tsx
│   ├── bar-chart.tsx         # Bar chart visualization component
│   ├── button.tsx            # Button component
│   ├── cell-action.tsx       # Table cell action buttons
│   ├── check-box.tsx         # Checkbox component
│   ├── container.tsx         # Container wrapper component
│   ├── data-table.tsx        # Data table for displaying records
│   ├── header.tsx            # Header component
│   ├── input.tsx             # Input field component
│   └── mobile-nav-bar.tsx    # Mobile navigation bar
├── hooks/                    # Custom hooks for managing state
│   ├── chart-data.ts         # Hook for generating chart data
│   ├── permission-modal-store.ts # Zustand store for permissions modal
│   ├── role-modal-store.ts   # Zustand store for roles modal
│   └── user-modal-store.ts   # Zustand store for users modal
├── pages/                    # Page-level components
│   ├── dashboard-page.tsx    # Dashboard with charts and statistics
│   ├── permission-management-page.tsx
│   ├── role-management-page.tsx
│   └── user-management-page.tsx
├── provider/                 # Global providers
│   └── modal-provider.tsx    # Provider for managing modals
├── index.css                 # Global styles
├── app.tsx                   # Main application entry
├── main.tsx                  # React DOM rendering entry
├── types.tsx                 # Type definitions
└── utils.ts                  # Utility functions

## 🚀 Getting Started

### **Frontend Setup**
1. Clone the repository:
   ```bash
   git clone https://github.com/Rajesh8531/RBAC-System.git
