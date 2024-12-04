import { useState } from 'react';
import localConfig from '../../local_config';

const DashboardLayout = ({ children }) => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { theme } = localConfig;

  const menuItems = [
    { icon: "📊", label: "Dashboard", active: true },
    { icon: "👥", label: "Users" },
    { icon: "💱", label: "Trades" },
    { icon: "💰", label: "Assets" },
    { icon: "📑", label: "KYC Requests" },
    { icon: "⚙️", label: "Settings" },
  ];

  return (
    <div style={{
      backgroundColor: theme.colors.background,
      color: theme.colors.text.primary,
      minHeight: "100vh",
      display: "flex"
    }}>
      {/* Sidebar */}
      <aside style={{
        width: isSidebarCollapsed ? "80px" : "260px",
        backgroundColor: "rgba(26, 27, 31, 0.95)",
        borderRight: "1px solid rgba(255, 255, 255, 0.1)",
        padding: "24px 16px",
        transition: theme.transition,
        backdropFilter: "blur(10px)",
        display: "flex",
        flexDirection: "column"
      }}>
        {/* Logo */}
        <div style={{ 
          marginBottom: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: isSidebarCollapsed ? "center" : "flex-start"
        }}>
          <img src="/logo.svg" alt="MoEX" height={32} />
        </div>

        {/* Navigation Menu */}
        <nav style={{ flex: 1 }}>
          {menuItems.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "12px 16px",
                marginBottom: "8px",
                borderRadius: "12px",
                cursor: "pointer",
                backgroundColor: item.active ? "rgba(41, 98, 255, 0.1)" : "transparent",
                color: item.active ? theme.colors.primary : theme.colors.text.secondary,
                transition: "all 0.2s",
                '&:hover': {
                  backgroundColor: "rgba(41, 98, 255, 0.05)",
                  color: theme.colors.primary
                }
              }}
            >
              <span style={{ fontSize: "20px", marginRight: "12px" }}>{item.icon}</span>
              {!isSidebarCollapsed && (
                <span style={{ fontSize: "14px", fontWeight: 500 }}>{item.label}</span>
              )}
              {item.active && !isSidebarCollapsed && (
                <div style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: theme.colors.primary,
                  marginLeft: "auto"
                }} />
              )}
            </div>
          ))}
        </nav>

        {/* Collapse Button */}
        <button
          onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
          style={{
            padding: "12px",
            backgroundColor: "rgba(41, 98, 255, 0.1)",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            color: theme.colors.primary,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {isSidebarCollapsed ? "→" : "←"}
        </button>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "24px", maxHeight: "100vh", overflow: "auto" }}>
        {/* Header */}
        <header style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "32px",
          padding: "16px",
          backgroundColor: "rgba(26, 27, 31, 0.95)",
          borderRadius: "16px",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)"
        }}>
          <h1 style={{ 
            fontSize: "24px",
            fontWeight: theme.typography.weights.bold,
            background: "linear-gradient(90deg, #2962FF, #6E56CF)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            Dashboard
          </h1>

          {/* User Menu */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "20px"
          }}>
            {/* Notification Bell */}
            <button style={{
              backgroundColor: "rgba(41, 98, 255, 0.1)",
              border: "none",
              borderRadius: "12px",
              padding: "10px",
              color: theme.colors.primary,
              cursor: "pointer"
            }}>
              🔔
            </button>

            {/* User Profile */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "8px 16px",
              backgroundColor: "rgba(41, 98, 255, 0.1)",
              borderRadius: "12px",
              cursor: "pointer"
            }}>
              <div style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                backgroundColor: theme.colors.primary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 600
              }}>
                A
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: "14px", fontWeight: 600 }}>Admin User</div>
                <div style={{ fontSize: "12px", color: theme.colors.text.secondary }}>Super Admin</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div style={{
          backgroundColor: "rgba(26, 27, 31, 0.95)",
          borderRadius: "16px",
          padding: "24px",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)"
        }}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout; 