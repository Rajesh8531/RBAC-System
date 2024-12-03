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
```
## 🚀 Getting Started

### **Frontend Setup**
1. Clone the repository:
   ```bash
   git clone https://github.com/Rajesh8531/RBAC-System.git
   ```
   
2. Navigate to the project directory:
   ```bash
   cd rbac
   ```
   
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the application:
  ```bash
   npm start
  ```
5.Open your browser and go to http://localhost:3000.


---

## User Instructions

Follow these steps to use the RBAC system effectively:

---

### 1. Initial Setup
1. Open the application in your browser.
2. Ensure that you allow the application to access your browser's localStorage to save data.

---

### 2. Creating Permissions
1. Navigate to the **Permission Management** page:
   - This page allows you to create new permissions for controlling user actions.
2. Click on the **"Add Permission"** button.
3. Enter the **Permission Name** (e.g., `create_user`, `delete_role`).
4. Save the permission.
5. Repeat for as many permissions as needed.

**Note**: Permissions must be created first as they are required to define roles.

---

### 3. Managing Roles
1. Navigate to the **Role Management** page:
   - This page allows you to define roles and assign permissions.
2. Click on the **"Add Role"** button.
3. Enter the **Role Name** (e.g., `Admin`, `Editor`).
4. Select the permissions you want to assign to the role.
5. Save the role.

**Tip**: You can edit or delete roles as required.

---

### 4. Managing Users
1. Navigate to the **User Management** page:
   - This page allows you to create and manage users.
2. Click on the **"Add User"** button.
3. Enter the **User Details**:
   - **Name**: Full name of the user.
   - **Email**: Email address of the user.
   - **Role**: Select a role for the user.
4. Save the user.
5. Users can be edited or deleted at any time.

---

### 5. Filtering Data
1. Use the **Search or Filter Bar** available on the **Users**, **Roles**, and **Permissions** pages.
   - Enter a keyword or phrase to quickly find specific records.
   - Filtering applies to the displayed data only, making it easier to manage large datasets.

---

### 6. Pagination
1. Navigate through the data using the **Pagination Controls** at the bottom of the table.
   - Use the **Next** and **Previous** buttons to view more pages.
   - You can also jump to a specific page using the page numbers.
2. Pagination ensures smooth navigation, even with large datasets.

---

### 7. Viewing the Dashboard
1. Navigate to the **Dashboard**:
   - This page provides a graphical overview of the system.
2. Check the charts for:
   - **User vs Status**: Displays the number of active and inactive users.
   - **User vs Roles**: Shows the distribution of users across roles.

---

### 8. LocalStorage Notes
- All data (users, roles, and permissions) is stored in your browser's localStorage.
- Clearing your browser’s cache will delete all data.

---

### 9. Resetting Data
If you need to reset the application:
1. Open your browser's developer tools (usually accessible via F12 or right-click > Inspect).
2. Navigate to the **Application** tab.
3. Select **LocalStorage** and clear the data for the current site.
4. Refresh the application.

---

### 10. Best Practices for Usage
- Always define **Permissions** before creating **Roles**.
- Assign roles thoughtfully to ensure users have appropriate access levels.
- Use **Filters** and **Pagination** to efficiently manage large datasets.

---
