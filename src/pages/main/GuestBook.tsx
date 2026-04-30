import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { isValidUrl } from "@/ts/check";
import { getBackendUrl } from "@/ts/helper";
import GuestBookComment from "@/components/guestbook/comment";
import { useTranslation } from "react-i18next";

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

// Simple styled input component
function Field({
  id, label, name, value, type = "text", multiline = false, rows = 1,
  error, helperText, onChange, onBlur, required = false, placeholder = "",
}: {
  id: string; label: string; name: string; value: string; type?: string;
  multiline?: boolean; rows?: number; error?: boolean; helperText?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  required?: boolean; placeholder?: string;
}) {
  const borderColor = error ? "rgba(255,45,107,0.7)" : "rgba(108,99,255,0.3)";
  const baseStyle: React.CSSProperties = {
    width: "100%", background: "rgba(15,15,26,0.6)", color: "var(--color-text)",
    border: `1px solid ${borderColor}`, borderRadius: "0.75rem",
    padding: "0.6rem 0.85rem", fontSize: "0.875rem", outline: "none",
    resize: multiline ? "vertical" : undefined,
  };
  return (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor={id} className="text-xs font-medium" style={{ color: "var(--color-muted)" }}>
        {label}{required && " *"}
      </label>
      {multiline ? (
        <textarea id={id} name={name} rows={rows} value={value}
          onChange={onChange} onBlur={onBlur} placeholder={placeholder}
          style={baseStyle} />
      ) : (
        <input id={id} name={name} type={type} value={value} required={required}
          onChange={onChange} onBlur={onBlur} placeholder={placeholder}
          style={baseStyle} />
      )}
      {helperText && (
        <span className="text-xs" style={{ color: error ? "var(--color-accent-3)" : "var(--color-muted)" }}>
          {helperText}
        </span>
      )}
    </div>
  );
}

const GuestBook = ({
  color: _,
  className: __,
  viewHeight: ___,
}: {
  color?: string;
  className?: string;
  viewHeight?: number;
}) => {
  const { t } = useTranslation();
  const [comments, setComments] = useState<Comment[]>([]);
  const [meta, setMeta] = useState<Meta>({ total: 0, page: 0, perPage: 0, pages: 0 });
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(4);
  const [refetch, setRefetch] = useState(1);

  const handlePageChange = (value: number) => setPage(value);

  const handleCommentCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPerPage(Number(event.target.value));
  };

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch(`${getBackendUrl()}/comment?perPage=${perPage}&page=${page}`);
      const data = (await response.json()) as Meta & { data: Comment[] };
      setMeta({ total: data.total, page: data.page, perPage: data.perPage, pages: data.pages });
      setComments(data.data ?? []);
    };
    fetchComments();
  }, [page, perPage, refetch]);

  const startComment = (page - 1) * meta.perPage + 1;
  const endComment = Math.min(startComment + meta.perPage - 1, meta.total);
  const displayText = `${t("Zeige Kommentare")} ${startComment}-${endComment} ${t("von")} ${meta.total}`;

  return (
    <div className="flex flex-col items-center w-full px-4 py-8">
      <h2 className="text-4xl font-bold mb-2" style={{ color: "var(--color-text)" }}>
        {t("Gästebuch")}
      </h2>
      <p className="text-base mb-8" style={{ color: "var(--color-muted)" }}>
        {t("Verewigen Sie sich")}
      </p>

      <Formik
        initialValues={{ author: "", email: "", content: "", profilePicture: "" }}
        validate={(values) => {
          const errors: { author?: string; email?: string; content?: string; profilePicture?: string } = {};
          if (!values.author) errors.author = t("Pflichtfeld");
          if (!values.content) errors.content = t("Pflichtfeld");
          if (values.profilePicture && !isValidUrl(values.profilePicture))
            errors.profilePicture = t("Ungültige URL");
          if (!values.email) errors.email = t("Pflichtfeld");
          else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email))
            errors.email = t("Ungültige Email Adresse");
          if (values.profilePicture?.length > 512)
            errors.profilePicture = t("URL zu lang");
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          await fetch(getBackendUrl() + "/comment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
            credentials: "include",
          });
          setSubmitting(false);
          resetForm();
          setRefetch((prev) => prev + 1);
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, handleReset, isSubmitting }) => (
          <form className="flex flex-col w-full md:w-2/3 lg:w-1/2 gap-3" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-3">
              <Field id="author" label="Name" name="author" value={values.author} required
                onChange={handleChange} onBlur={handleBlur}
                error={Boolean(errors.author && touched.author)}
                helperText={errors.author && touched.author ? errors.author : ""}
              />
              <Field id="email" label="Email" name="email" type="email" value={values.email} required
                onChange={handleChange} onBlur={handleBlur}
                error={Boolean(errors.email && touched.email)}
                helperText={errors.email && touched.email ? errors.email : ""}
              />
              <Field id="profilepic" label={t("Profilbild URL")} name="profilePicture" value={values.profilePicture}
                placeholder="https://example.com/picture.jpg"
                onChange={handleChange} onBlur={handleBlur}
                error={Boolean((values.profilePicture === "" || errors.profilePicture) && touched.profilePicture)}
                helperText={
                  values.profilePicture === "" && touched.profilePicture
                    ? t("Ein Profilbild würde besser aussehen :^)")
                    : errors.profilePicture
                }
              />
            </div>
            <Field id="content" label={t("Nachricht")} name="content" value={values.content} multiline rows={4} required
              onChange={handleChange} onBlur={handleBlur}
              error={Boolean(errors.content && touched.content)}
              helperText={errors.content && touched.content ? errors.content : ""}
            />

            {/* Preview */}
            <div className="flex flex-col items-center w-full mt-2">
              <p className="text-sm mb-2" style={{ color: "var(--color-muted)" }}>
                {t("Hier sehen Sie die Vorschau Ihres Posts")}:
              </p>
              <GuestBookComment
                timestamp={new Date()}
                author={values.author}
                content={values.content}
                profilePicture={errors.profilePicture ? undefined : values.profilePicture}
              />
            </div>

            <div className="flex justify-center gap-3 mt-2">
              <button data-testid="submit" type="submit" disabled={isSubmitting}
                className="px-5 py-2 rounded-xl text-sm font-semibold"
                style={{ background: "var(--color-accent)", color: "#fff" }}>
                {t("Absenden")}
              </button>
              <button type="reset" onClick={handleReset}
                className="px-5 py-2 rounded-xl text-sm font-semibold"
                style={{ background: "rgba(255,255,255,0.08)", color: "var(--color-muted)", border: "1px solid rgba(255,255,255,0.12)" }}>
                {t("Zurücksetzen")}
              </button>
            </div>
          </form>
        )}
      </Formik>

      {/* Comments list */}
      <div className="flex flex-col items-center w-full mt-10">
        <p className="text-sm mb-3" style={{ color: "var(--color-muted)" }}>{displayText}</p>

        {/* Pagination */}
        <div className="flex gap-1 mb-4 flex-wrap justify-center">
          {Array.from({ length: meta.pages }, (_, i) => i + 1).map((p) => (
            <button key={p} onClick={() => handlePageChange(p)}
              className="w-8 h-8 rounded-lg text-sm font-medium"
              style={{
                background: p === page ? "var(--color-accent)" : "rgba(255,255,255,0.06)",
                color: p === page ? "#fff" : "var(--color-muted)",
                border: p === page ? "none" : "1px solid rgba(255,255,255,0.1)",
              }}>
              {p}
            </button>
          ))}
        </div>

        {/* Per-page selector */}
        <div className="flex items-center gap-3 mb-6">
          <label htmlFor="commentCount" className="text-sm" style={{ color: "var(--color-muted)" }}>
            {t("Kommentare pro Seite")}:
          </label>
          <input id="commentCount" type="number" max={10} value={perPage}
            onChange={handleCommentCountChange}
            className="w-16 rounded-lg px-2 py-1 text-sm text-center"
            style={{ background: "rgba(15,15,26,0.6)", border: "1px solid rgba(108,99,255,0.3)", color: "var(--color-text)" }}
          />
        </div>

        {/* Comment grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 w-full">
          {comments?.map((comment, index) => (
            <GuestBookComment
              key={index}
              timestamp={new Date(comment.createdAt)}
              author={comment.author}
              content={comment.content}
              profilePicture={comment.profilePicture}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuestBook;
