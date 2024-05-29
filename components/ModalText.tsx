import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface ModalTextProps {
    data: {
        id: string,
        url?: string;
        title?: string;
        copyright?: string;
        explanation?: string;
    };
}

interface Post {
    id: string;
    comment: string;
    dateModified: Date;
}

const ModalText: React.FC<ModalTextProps> = ({ data }) => {

    const [loading, setLoading] = useState<boolean>(true);
    const [save, setSave] = useState<boolean>(false);
    const [post, setPost] = useState<Post>({
        id: "",
        comment: "",
        dateModified: new Date()
    });

    useEffect(() => {
        axios
            .get(`/api/getPost?id=${data.id}`)
            .then((response) => {
                if (response.status === 200) {
                    setPost(response.data)
                    setLoading(false);
                } else {
                    console.warn("error");
                    setLoading(false);
                }
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, [data.id]);

    const createComment = (comment: string, id: string) => {
        setSave(true);
        axios
            .post(`/api/createPost?id=${data.id}`, { comment, dateModified: new Date() })
            .then((response) => {
                if (response.status === 200) {
                    setSave(false);
                    return alert(response.data.message);
                } else {
                    setSave(false);
                    return alert(response.data.message);
                }
            })
            .catch((error) => {
                console.error(error);
                alert("Hubo un error en la conexión, el comentario no se ha guardado");
                setSave(false);
                setPost({
                    id: data.id,
                    comment: "",
                    dateModified: new Date()
                });
            });
    };

    return (
        <div className="pt-1">
            <div className="imageNASA">
                {data?.url ? <img src={`${data.url}`} alt="MDN" /> : null}
            </div>
            {data?.title ? (
                <p className="px-2 fs-20 mb-1 mt-3">
                    <span className="text-center text-secondary fw-600">
                        Title Image:{' '}
                    </span>
                    {data?.title}
                </p>
            ) : null}
            {data?.copyright ? (
                <p className="px-2 fs-20 mb-1">
                    <span className="text-center text-secondary fw-600">Copyright: </span>
                    {data?.copyright}
                </p>
            ) : null}
            {data?.explanation ? (
                <p className="px-2 fs-20 mb-1">
                    <span className="text-center text-secondary fw-600">
                        Explanation:{' '}
                    </span>
                    {data?.explanation}
                </p>
            ) : null}
            <div className='row px-2'>
                <div className='col'>
                    <textarea
                        placeholder="Add a comment.."
                        value={loading ? "looking for comments.." : post.comment}
                        className="form-control"
                        onChange={(e) => setPost({ ...post, comment: e.target.value })}
                    />
                </div>
                <div className='col-md-3'>
                    <button className={`buttonComment my-2 ${save ? "disabled" : ""}`} disabled={save} onClick={() => createComment(post.comment, post.id)} >Comentar</button>
                    {save ? <p className="my-2"> Guardando comentario... </p> : null}
                </div>
            </div>
        </div>
    );
}

export default ModalText;