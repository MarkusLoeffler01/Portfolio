import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import { isValidUrl } from "@/ts/check";
import { getBackendUrl } from "@/ts/helper";
import GuestBookComment from "@/components/guestbook/comment";


type Meta = {
  total: number;
  page: number;
  perPage: number;
  pages: number;
}

type Comment = {
  author: string;
  content: string;
  profilePicture: string;
  timestamp: Date;
}


const GuestBook = ({color: _, className: __, viewHeight: ___, className: ____}: {color?: string, className?: string, viewHeight?: number}) => {

  const [comments, setComments] = useState<Comment[]>([]);
  const [meta, setMeta] = useState<Meta>({total: 0, page: 0, perPage: 0, pages: 0});
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(4);

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleCommentCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPerPage(Number(event.target.value));
  };

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch(`${getBackendUrl()}/comment?perPage=${perPage}&page=${page}`);
      const data = await response.json() as Meta & {data: Comment[]};
      setMeta({total: data.total, page: data.page, perPage: data.perPage, pages: data.pages});
      setComments(data.data);
    };
    fetchComments();
  }, [page, perPage]);


  const startComment = ( page - 1) * meta.perPage + 1;
  const endComment = Math.min(startComment + meta.perPage - 1, meta.total);
  const displayText = `Showing comments ${startComment}-${endComment} out of ${meta.total}`;
  return (
    <Box sx={{
              // display: "grid",
              flexDirection: "column",

              justifyContent: "flex-end",
              height: "100%",
              overflowY: "hidden"
    }}>
      <h1>Guestbook</h1>
      <p>Leave a message!</p>

      <Formik
      initialValues={{
        author: "",
        email: "",
        content: "",
        profilePicture: ""
      }}

      validate={values => {
        console.log(values);
        const errors: {author?: string, email?: string, content?: string, profilePicture?: string} = {};
        if(!values.author) errors.author = "Required";
        if(!values.content) errors.content = "Required";
        if(values.profilePicture && !isValidUrl((values.profilePicture))) errors.profilePicture = "Invalid url";
        if(!values.email) errors.email = "Required";
        else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) errors.email = "Invalid email address";
        
        if(values.profilePicture?.length > 512) errors.profilePicture = "Url too long";
        console.log(values.profilePicture.length);

        return errors;
      }}

      onSubmit={async (values, { setSubmitting}) => {
        setSubmitting(true);

        const options: RequestInit = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
          credentials: "include"
        };

        await fetch(getBackendUrl()+"comment", options);
        setSubmitting(false);
      }}
      >
        {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset,
            isSubmitting
        }) => (
            <Box component="form" className="flex flex-col w-[50vw] self-center items-center"sx={{
              '& .MuiTextField-root': { m: 1 },
            }} onSubmit={handleSubmit}>
              <Box component="div" className="flex justify-end">
                <TextField
                  id="author"
                  label="Name"
                  name="author"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={(errors.author && touched.author) ? true : false}
                  helperText={(errors.author && touched.author) ? errors.author : ""}
                  value={values.author}
                  type="text"
                  required
                />
                <TextField
                  id="email"
                  label="Email"
                  name="email"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={(errors.email && touched.email) ? true : false}
                  helperText={(errors.email && touched.email) ? errors.email : ""}
                  value={values.email}
                  type="email"
                />
                <TextField
                  id="profilepic"
                  label="Profile picture url"
                  placeholder="https://example.com/picture.jpg"
                  name="profilePicture"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={((values.profilePicture === "" || errors.profilePicture) && touched.profilePicture) ? true : false }
                  helperText={(values.profilePicture === "" && touched.profilePicture) ? "A profile picture would make you look better :^)" : errors.profilePicture}
                  value={values.profilePicture}
                  type="text"
                  sx={(values.profilePicture === "" && touched.profilePicture) ? {
                    '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'orange', // Anpassung der Randfarbe im Fehlerzustand
                    },
                    '& .MuiFormLabel-root.Mui-error': {
                      color: 'orange', // Anpassung der Label-Farbe im Fehlerzustand
                    },
                    '& .MuiFormHelperText-root.Mui-error': {
                      color: 'orange', // Anpassung der Helper-Text-Farbe im Fehlerzustand
                    },
                  } : {}}
                />
              </Box>
              <Box component="div" className="flex justify-end w-full">
                <TextField
                  fullWidth
                  id="content"
                  label="Nachricht (Mehrzeilig)"
                  name="content"
                  multiline
                  autoComplete="off"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={(errors.content && touched.content) ? true : false}
                  helperText={(errors.content && touched.content) ? errors.content : ""}
                  value={values.content}
                  type="text"
                  required
                />
              </Box>
              <Box className="preview" component="div" display={"flex"} flexDirection={"column"} justifyItems={"center"} width="80%">
                Hier siehst du die Prewiew deines Posts:
                <GuestBookComment timestamp={new Date()} author={values.author} content={values.content} profilePicture={values.profilePicture} />
              </Box>
              <Box component="div" className="flex justify-center *:ml-1 *:mr-1">
                <button type="submit" disabled={isSubmitting}>
                    Submit
                </button>
                <button type="reset" onClick={handleReset}>
                    Reset
                </button>
              </Box>
              
            </Box>
        )}
      </Formik>
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
        <Box sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginY: "7%",
        }}>
          <Box sx={{
            marginRight: "10%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
            <Typography sx={{
              whiteSpace: "nowrap"
            }}>
              {displayText}
            </Typography>
            <Pagination sx={{width: "fit-content"}} count={meta.pages} page={page} onChange={handleChange} />
          </Box>
          <Box sx={{
            paddingLeft: "3%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
            <InputLabel htmlFor="commentCount">Comment Count</InputLabel>
            <TextField label="count" name="commentCount" onChange={handleCommentCountChange} onScroll={() => false} inputProps={{ type: "number", min: "1", max: "5"}} maxRows={1} />
          </Box>
        </Box>
        <Box component="div" display="grid" width="100%" sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(auto, 1fr))",
                  gap: "10px",
                  "& > *": {
                    // justifySelf: "center",
                    // alignSelf: "center",
                  }
                }}>
                  {comments.map((comment, index) => (

                    <GuestBookComment key={index} timestamp={comment.timestamp} author={comment.author} content={comment.content} profilePicture={comment.profilePicture} />
                  ))}

        </Box>
      </Box>
    </Box>
  )
}

export default GuestBook;