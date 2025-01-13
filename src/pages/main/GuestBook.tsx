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
};

type Comment = {
  id: number;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string | null;
  deleted: 0 | 1;
  profilePicture: string;
};

const GuestBook = ({
  color: _,
  className: __,
  viewHeight: ___,
}: {
  color?: string;
  className?: string;
  viewHeight?: number;
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [meta, setMeta] = useState<Meta>({
    total: 0,
    page: 0,
    perPage: 0,
    pages: 0,
  });
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(4);
  const [refetch, setRefetch] = useState(1);

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleCommentCountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPerPage(Number(event.target.value));
  };

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch(
        `${getBackendUrl()}/comment?perPage=${perPage}&page=${page}`
      );
      const data = (await response.json()) as Meta & { data: Comment[] };
      setMeta({
        total: data.total,
        page: data.page,
        perPage: data.perPage,
        pages: data.pages,
      });
      setComments(data.data ?? []);
    };
    fetchComments();
  }, [page, perPage, refetch]);

  const startComment = (page - 1) * meta.perPage + 1;
  const endComment = Math.min(startComment + meta.perPage - 1, meta.total);
  const displayText = `Showing comments ${startComment}-${endComment} out of ${meta.total}`;
  return (
    <Box
      sx={{
        flexDirection: "column",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        overflowY: "hidden",
        padding: "2rem 1rem",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Guestbook
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Leave a message!
      </Typography>

      <Formik
        initialValues={{
          author: "",
          email: "",
          content: "",
          profilePicture: "",
        }}
        validate={(values) => {
          const errors: {
            author?: string;
            email?: string;
            content?: string;
            profilePicture?: string;
          } = {};
          if (!values.author) errors.author = "Required";
          if (!values.content) errors.content = "Required";
          if (values.profilePicture && !isValidUrl(values.profilePicture))
            errors.profilePicture = "Invalid url";
          if (!values.email) errors.email = "Required";
          else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          )
            errors.email = "Invalid email address";

          if (values.profilePicture?.length > 512)
            errors.profilePicture = "Url too long";

          return errors;
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSubmitting(true);

          const options: RequestInit = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
            credentials: "include",
          };

          await fetch(getBackendUrl() + "/comment", options);
          setSubmitting(false);
          resetForm();
          setRefetch((prev) => prev + 1);
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
          isSubmitting,
        }) => (
          <Box
            component="form"
            className="flex flex-col w-full md:w-2/3 lg:w-1/2 self-center items-center"
            sx={{
              "& .MuiTextField-root": { m: 1 },
            }}
            onSubmit={handleSubmit}
          >
            <Box
              component="div"
              className="flex flex-col md:flex-row justify-center w-full"
            >
              <TextField
                id="author"
                label="Name"
                name="author"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.author && touched.author)}
                helperText={
                  errors.author && touched.author ? errors.author : ""
                }
                value={values.author}
                type="text"
                required
                fullWidth
                margin="normal"
                data-testid="author"
              />
              <TextField
                id="email"
                label="Email"
                name="email"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.email && touched.email)}
                helperText={
                  errors.email && touched.email ? errors.email : ""
                }
                value={values.email}
                type="email"
                required
                fullWidth
                margin="normal"
                data-testid="email"
              />
              <TextField
                data-testid="profilepic"
                id="profilepic"
                label="Profile picture URL"
                placeholder="https://example.com/picture.jpg"
                name="profilePicture"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  Boolean(
                    (values.profilePicture === "" || errors.profilePicture) &&
                      touched.profilePicture
                  )
                }
                helperText={
                  values.profilePicture === "" && touched.profilePicture
                    ? "A profile picture would make you look better :^)"
                    : errors.profilePicture
                }
                value={values.profilePicture}
                type="text"
                fullWidth
                margin="normal"
                sx={
                  values.profilePicture === "" && touched.profilePicture
                    ? {
                        "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
                          {
                            borderColor: "orange",
                          },
                        "& .MuiFormLabel-root.Mui-error": {
                          color: "orange",
                        },
                        "& .MuiFormHelperText-root.Mui-error": {
                          color: "orange",
                        },
                      }
                    : {}
                }
              />
            </Box>
            <Box component="div" className="flex w-full">
              <TextField
                data-testid="content"
                id="content"
                label="Nachricht"
                name="content"
                multiline
                rows={4}
                autoComplete="off"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.content && touched.content)}
                helperText={
                  errors.content && touched.content ? errors.content : ""
                }
                value={values.content}
                type="text"
                required
                margin="normal"
                fullWidth
              />
            </Box>
            <Box
              className="preview"
              component="div"
              display="flex"
              flexDirection="column"
              alignItems="center"
              width="100%"
              mt={2}
            >
              <Typography variant="h6" gutterBottom>
                Hier siehst du die Vorschau deines Posts:
              </Typography>
              <GuestBookComment
                timestamp={new Date()}
                author={values.author}
                content={values.content}
                profilePicture={errors.profilePicture ? undefined : values.profilePicture}
              />
            </Box>
            <Box
              component="div"
              className="flex justify-center mt-4 space-x-2"
            >
              <button
                data-testid="submit"
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
              <button
                type="reset"
                onClick={handleReset}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Reset
              </button>
            </Box>
          </Box>
        )}
      </Formik>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          mt: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginY: "2rem",
            width: "100%",
          }}
        >
          <Typography variant="body1" gutterBottom>
            {displayText}
          </Typography>
          <Pagination
            sx={{ width: "fit-content", marginBottom: "1rem" }}
            count={meta.pages}
            page={page}
            onChange={handleChange}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <InputLabel htmlFor="commentCount">Comments per page:</InputLabel>
            <TextField
              id="commentCount"
              name="commentCount"
              onChange={handleCommentCountChange}
              inputProps={{ type: "number", max: "10" }}
              value={perPage}
              sx={{ width: "80px", marginLeft: "1rem" }}
            />
          </Box>
        </Box>
        <Box
          component="div"
          width="100%"
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              // md: "1fr 1fr 1fr",
            },
            gap: {
              xs: "1rem",
              sm: "2rem",
              md: "3rem",
            }
          }}
        >
          {comments?.map((comment, index) => (
            <GuestBookComment
              key={index}
              timestamp={new Date(comment.createdAt)}
              author={comment.author}
              content={comment.content}
              profilePicture={comment.profilePicture}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default GuestBook;
