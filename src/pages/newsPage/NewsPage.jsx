import axios from "axios";
import React, {useEffect, useState} from "react";
import {Box, Card, CardContent, CardMedia, Pagination, Typography} from "@mui/material";
import {defaultNewsImageUrl} from "../../settings/urls";

const NewsPage = () => {
    const [news, setNews] = useState({totalResults: 0, articles: []});
    const [pagination, setPagination] = useState({page: 1, total: 1})

    const apiKey = process.env.REACT_APP_NEWS_API_KEY;
    const lang = "uk";
    const searchParam = "ukraine";
    const pageSize = 20;

    const newsRequest = async () => {
        const url = `https://newsapi.org/v2/everything?apiKey=${apiKey}&q=${searchParam}&language=${lang}&pageSize=${pageSize}&page=${pagination.page}`;
        const response = await axios.get(url);
        setNews(response.data);
        setPagination({...pagination, total: Math.ceil(response.data.totalResults / pageSize)});
    }

    const pageChangeHandler = (event, value) => {
        setPagination({...pagination, page: value});
    }

    useEffect(() => {
        newsRequest();
        // window.scrollTo({top: 0, behavior: "smooth"});
    }, [pagination.page])

    return (
        <>
            <div style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "10px", marginTop: "10px"}}>
                {
                    news.articles.map((article) => (
                        <a key={article.publishedAt} style={{textDecoration: "none"}} href={article.url}>
                            <Card sx={{maxWidth: 345, height: "100%"}}>
                                <CardMedia
                                    sx={{height: 140}}
                                    image={article.urlToImage ? article.urlToImage : defaultNewsImageUrl}
                                    title={article.title}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {article.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                        {article.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </a>
                    ))
                }
            </div>
            <Box sx={{textAlign: "center"}}>
                <Pagination onChange={pageChangeHandler} sx={{m: "10px", display: "inline-block"}} count={pagination.total} color="primary"/>
            </Box>
        </>
    )
}

export default NewsPage;