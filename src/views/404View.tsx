import Menu from "@/components/Menu"
import "@/styles/NotFound.scss"
import { Button, Result } from 'antd'
import React from 'react'

const NotFoundView: React.FC = () => {
	return (
		<div className="NotFound">
			<title>WhatsApp - 404</title>
			<div className="not-found-container">
				<Result
					style={{ scale: "1.5" }}
					status="404"
					
					title={<span>404</span>}
					subTitle={<span>Sorry, the page you visited does not exist.</span>}
					extra={
						<Button style={{ color: "white" }} type="primary">Back Home</Button>
					}
				/>
			</div>
			<Menu />
		</div>
	)
}

export default NotFoundView