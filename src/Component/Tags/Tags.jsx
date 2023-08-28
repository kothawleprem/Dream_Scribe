import React, { useState, useEffect } from "react";
import NavbarComan from "../../Component/NavbarComan";
import { useLocation } from "react-router-dom";
import { Container, Spinner } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

const Tags = () => {
  const [tagsData, setTagsData] = useState(undefined);
  const { state } = useLocation();


 useEffect(() => {
    (async () => {
      const dreamPrev = state.dreamDescription
      console.log(state.dreamDescription);
      const wordsArray = dreamPrev.split(" ");
      const dream = wordsArray.slice(4).join(" ");
      console.log(dream)
      const url = `${process.env.REACT_APP_C_BASE_URL}/v2/users/${process.env.REACT_APP_USER_ID}/apps/dreamscribe/workflows/dream-tags/results`;

      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Key ${process.env.REACT_APP_KEY}`);
      myHeaders.append("Content-Type", "application/json");

      const data = {
        inputs: [
          {
            data: {
              text: {
                raw: dream,
              },
            },
          },
        ],
      };

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(data),
        redirect: "follow",
      };

      try {
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const responseData = await response.json();
        console.log(responseData);
        console.log(responseData.results[0].outputs[3].data.text.raw);
        const rawData = responseData.results[0].outputs[3].data.text.raw;
        // const sections = rawData.split("\n\n");
        // console.log(sections);
        setTagsData(rawData);
      } catch (error) {
        toast.error(" An error occure while fetching Tags from the AI!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.error("Fetch error:", error);
        console.error("Fetch error:", error);
      }
    })();
  }, []);

  return (
    <>

        <center>
          <p className="py-1 text-xl font-bold leading-normal text-gray-600 lg:text-xl xl:text-4xl">
            Tags
          </p>
          <Container>
            <div class="max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className=" mb-4">
                {tagsData !== undefined ? (
                  <>
                    <div className="poem-preview">{tagsData}</div>
                  </>
                ) : (
                  <>
                    <center>
                      <Spinner animation="grow" />
                      Loading Tags Data...
                    </center>
                  </>
                )}
              </div>
            </div>
          </Container>
        </center>
      <ToastContainer />
    </>
  );
};

export default Tags;
