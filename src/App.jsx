import React, { useState } from "react";
import { Table, Checkbox, Space, Tooltip } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";

function App() {
  const initialData = [
    {
      key: "1",
      ip: "192.168.138.12",
      location: "",
      hostname: "hrate",
      hardware: "",
      type: "مولفه های داخلی",
      sensitivity: "زیاد",
      description: "",
      ports: "22, 443",
      cves: "CVE-1999-0524,CVE-1999-0533",
    },
    {
      key: "2",
      ip: "18.168.138.12",
      location: "",
      hostname: "salam",
      hardware: "",
      type: "مولفه های خارجی",
      sensitivity: "کم",
      description: "",
      ports: "22, 443",
      cves: "CVE-1999-0524,CVE-1999-0533",
    },
  ];

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [tableData, setTableData] = useState(initialData);
  const [ipSortOrder, setIpSortOrder] = useState(null); // 'asc' | 'desc'

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const sortByIp = () => {
    const ipToNumber = (ip) =>
      ip.split(".").reduce((acc, octet, i) => acc + parseInt(octet) * 256 ** (3 - i), 0);

    const newOrder = ipSortOrder === "asc" ? "desc" : "asc";

    const sorted = [...tableData].sort((a, b) => {
      const result = ipToNumber(a.ip) - ipToNumber(b.ip);
      return newOrder === "asc" ? result : -result;
    });

    setIpSortOrder(newOrder);
    setTableData(sorted);
  };

  const columns = [
    {
      title: (
        <Checkbox
          checked={selectedRowKeys.length === tableData.length && tableData.length > 0}
          indeterminate={
            selectedRowKeys.length > 0 && selectedRowKeys.length < tableData.length
          }
          onChange={(e) =>
            setSelectedRowKeys(e.target.checked ? tableData.map((d) => d.key) : [])
          }
        />
      ),
      dataIndex: "checkbox",
      render: (_, record) => (
        <div style={{ paddingRight: 10 }}>
          <Checkbox
            checked={selectedRowKeys.includes(record.key)}
            onChange={(e) => {
              const checked = e.target.checked;
              const newKeys = checked
                ? [...selectedRowKeys, record.key]
                : selectedRowKeys.filter((k) => k !== record.key);
              setSelectedRowKeys(newKeys);
            }}
          />
        </div>
      ),
      width: 50,
    },
    {
      title: (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ marginLeft: 4 }}>IP</span>
          <img
            src="/brush.svg"
            alt="sort"
            onClick={sortByIp}
            style={{
              width: 14,
              height: 14,
              cursor: "pointer",
              transform: ipSortOrder === "asc" ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s",
            }}
          />
        </div>
      ),
      dataIndex: "ip",
      width: 130,
      align: "center",
    },
    {
      title: "مکان",
      dataIndex: "location",
      width: 100,
      align: "center",
    },
    {
      title: "نام میزبان",
      dataIndex: "hostname",
      width: 100,
      align: "center",
    },
    {
      title: "آدرس سخت افزار",
      dataIndex: "hardware",
      width: 150,
      align: "center",
    },
    {
      title: "نوع",
      dataIndex: "type",
      width: 150,
      align: "center",
    },
    {
      title: "حساسیت",
      dataIndex: "sensitivity",
      width: 100,
      align: "center",
    },
    {
      title: "توضیحات",
      dataIndex: "description",
      width: 120,
      align: "center",
    },
    {
      title: "درگاه",
      dataIndex: "ports",
      width: 80,
      align: "center",
      render: (text) => {
        const maxCharsPerLine = 4;
        const lines = text.match(new RegExp(`.{1,${maxCharsPerLine}}`, "g")) || [];

        return (
          <div
            style={{
              lineHeight: "1.5em",
              whiteSpace: "normal",
              wordBreak: "break-word",
              textAlign: "center",
            }}
          >
            {lines.map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </div>
        );
      },
    },
    {
      title: "شناسه ی آسیب‌پذیری",
      dataIndex: "cves",
      width: 180,
      align: "center",
      render: (text) => (
        <div>
          {text.split(",").map((cve, index) => (
            <div key={index}>{cve}</div>
          ))}
        </div>
      ),
    },
    {
      title: "عملیات",
      dataIndex: "actions",
      render: () => (
        <Space>
          <Tooltip title="ویرایش">
            <EditOutlined style={{ color: "orange" }} />
          </Tooltip>
          <Tooltip title="حذف">
            <DeleteOutlined style={{ color: "black" }} />
          </Tooltip>
          <Tooltip title="مشاهده گردش کار">
            <FileSearchOutlined style={{ color: "#1890ff" }} />
          </Tooltip>
        </Space>
      ),
      align: "center",
      width: 100,
    },
  ];

  const components = {
    header: {
      cell: (props) => (
        <th
          {...props}
          style={{
            ...props.style,
            background: "linear-gradient(to bottom, #a5c6e0, #f0f0f0)",
            border: "none",
            textAlign: "center",
            fontWeight: "bold",
            padding: "8px",
            borderRadius: 0,
          }}
        />
      ),
    },
  };

  return (
    <div style={{ direction: "rtl", padding: 16, display: "flex", justifyContent: "center" }}>
      <div style={{ maxWidth: "100%", width: "1200px" }}>
        <style>{`
          .ant-table {
            font-size: 11px;
            border-radius: 0 !important;
          }
          .ant-table-thead > tr > th {
            font-weight: 700;
            font-size: 11px;
            text-align: center;
            padding: 4px 8px !important;
            border-radius: 0 !important;
          }
          .ant-table-tbody > tr > td {
            font-weight: 400;
            font-size: 11px;
            text-align: center;
            padding: 4px 8px !important;
            height: 32px;
            border-radius: 0 !important;
          }
          .ant-table-tbody > tr {
            height: 32px;
            border-radius: 0 !important;
          }
          input {
            border-radius: 0 !important;
          }
        `}</style>

        <Table
          columns={columns}
          dataSource={tableData}
          pagination={false}
          bordered
          rowKey="key"
          components={components}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "linear-gradient(to bottom, #a5c6e0, #f0f0f0)",
            padding: "8px 12px",
            fontSize: 11,
            borderRadius: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <label style={{ marginRight: 4 }}>طول صفحه:</label>
            <input
              type="text"
              style={{
                width: 60,
                fontSize: 11,
                border: "1px solid #ccc",
                padding: "2px 4px",
                borderRadius: 0,
              }}
            />
          </div>

          <div style={{ width: 20 }} />

          <div style={{ display: "flex", alignItems: "center" }}>
            <label style={{ marginRight: 4 }}>برو به صفحه:</label>
            <input
              type="text"
              style={{
                width: 60,
                fontSize: 11,
                border: "1px solid #ccc",
                padding: "2px 4px",
                borderRadius: 0,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
