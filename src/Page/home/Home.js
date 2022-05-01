import React from 'react'
import { Row, Col, Pagination, Button } from 'antd';
import 'antd/dist/antd.css';
import { SearchInput } from "../../components/custom/Customize"
import apiProject from './Api/apiProject'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { Card } from 'antd';
const Home = () => {
  const [status, setStatus] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(2)
  const [q, setQ] = useState(null)
  const navigate = useNavigate()
 

  const { Meta } = Card;
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await apiProject.getAllProject({ page: page, size: pageSize });

        setTotal(res.count)
        setDataSource(res.rows);

      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, [])

  useEffect(() => {
    const handleSearch = (e) => {
      setQ(e)
      const getData = async () => {
        try {
          const res = await apiProject.searchQ({ q: q.target.value, page: page, size: pageSize });
          if (e.target.value && !res.rows[0]) {
            setPage(1)
          }
          setTotal(res.count)
          setDataSource(res.rows);
        } catch (err) {
          console.log(err);
        }
      }
      getData();
    }
    !!q && handleSearch(q)
  }, [page, q, pageSize])
  return (
    <div style={{ padding: 50 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "20px" }}>
        <Link to="/insert/project"><Button type="primary">Tạo Dự Án</Button></Link>
        <SearchInput
          onChange={(e) => { setQ(e) }}
          style={{ marginRight: 10 }} placeholder="Tìm kiếm" />
      </div>
      <Row style={{ flexWrap: "wrap" }} gutter={[32, 16]}>
        {dataSource.map((item, index) => {
          return <Col span={8} key={index}>
            <Card
              onClick={()=>{navigate(`/infoProject/${item.project_id}`)}}
              hoverable
              style={{ width: 240 }}
              cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
            >
              <Meta title={item.name} description={`Số nhân viên:${item.emp_number}`} />
            </Card>,
          </Col>
        })}
      </Row>
      <Pagination
        style={{ marginTop: 30 }}
        defaultCurrent={1}
        total={total}
        pageSize={pageSize}
        showSizeChanger={[2, 5, 10, 15, 20, 30, 50, 100]}
        pageSizeOptions={[2, 5, 10, 15, 20, 30, 50, 100]}
        onChange={(page, pageSize) => {
          setPage(page)
          setPageSize(pageSize)
          const getData = async () => {
            try {
              const res = await apiProject.getAllProject({ page: page, size: pageSize });
              setTotal(res.count)
              setDataSource(res.rows);
            } catch (err) {
              console.log(err);
            }
          }
          !q && getData()
        }} />
    </div>

  )
}

export default Home