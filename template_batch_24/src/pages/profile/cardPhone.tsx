import React from "react";
import { Badge } from "flowbite-react";
import { Card } from "flowbite-react";
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { Flowbite } from "flowbite-react";
import { useEffect, useState } from "react";
import type { CustomFlowbiteTheme } from "flowbite-react";
import CardAddPhone from "./add/cardAddPhone";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "cookies-next";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";

const customTheme: CustomFlowbiteTheme = {
  button: {
    color: {
      delete: "hover:bg-red-400",
      edit: "hover:bg-yellow-300",
      add: "hover:bg-emerald-300",
    },
  },
};

const CardPhone = () => {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [refresh, setRefresh] = useState(false);

  const [dataProfile, setDataProfile] = React.useState("");
  const dataUser = useSelector((state: any) => state.user.oneUser);
  const router = useRouter();
  useEffect(() => {
    const userToken = getCookie("access_token");
    if (typeof userToken === "string") {
      const fetchData = async () => {
        const decodedData: any = jwt_decode(userToken);
        setDataProfile(decodedData);
      };
      console.log(fetchData());
    } else {
      router.push("/signin");
    }
  }, [router]);
  return (
    <Card className="ml-3">
      {dataUser &&
        dataUser.map((item: any) => (
          <div key={item.userId}>
            <div className="mb-4 flex items-center justify-between">
              <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                Phones
              </h5>
              <span className="flex items-center">
                <Flowbite theme={{ theme: customTheme }}>
                  <Button
                    color="add"
                    className="w-5 h-5"
                    onClick={() => setOpenModal("form-elements")}
                  >
                    <svg
                      className="w-4 h-4 text-black"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 5.757v8.486M5.757 10h8.486M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </Button>
                  <Modal
                    show={openModal === "form-elements"}
                    size="lg"
                    popup
                    onClose={() => setOpenModal(undefined)}
                  >
                    <Modal.Header />
                    <Modal.Body>
                      <CardAddPhone
                        setOpenModal={setOpenModal}
                        setRefresh={setRefresh}
                        setDataProfile={dataProfile}
                      />
                    </Modal.Body>
                  </Modal>
                </Flowbite>
              </span>
            </div>
            {item.userPhoneNumber.map(
              (phone: { phone: string; pontycode: string }, index: number) => (
                <div key={index} className="flow-root">
                  <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    <li className="py-3 sm:py-4">
                      <div className="flex items-center space-x-4">
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm text-gray-900 dark:text-gray-400">
                            {phone.phone}
                            {phone.pontycode}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Flowbite theme={{ theme: customTheme }}>
                            <Button
                              color="edit"
                              className="w-5 h-5"
                              onClick={() => {
                                setOpenModalEdit(true); // Open the edit modal
                              }}
                            >
                              <svg
                                className="w-3 h-4 text-black"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="m13.835 7.578-.005.007-7.137 7.137 2.139 2.138 7.143-7.142-2.14-2.14Zm-10.696 3.59 2.139 2.14 7.138-7.137.007-.005-2.141-2.141-7.143 7.143Zm1.433 4.261L2 12.852.051 18.684a1 1 0 0 0 1.265 1.264L7.147 18l-2.575-2.571Zm14.249-14.25a4.03 4.03 0 0 0-5.693 0L11.7 2.611 17.389 8.3l1.432-1.432a4.029 4.029 0 0 0 0-5.689Z" />
                              </svg>
                            </Button>
                            <Modal
                              // show={openModalEdit && id === emailObj.id}
                              size="lg"
                              popup
                              onClose={() => setOpenModalEdit(false)}
                            >
                              <Modal.Header />
                              <Modal.Body>
                                <CardAddPhone
                                  setOpenModal={setOpenModal}
                                  setRefresh={setRefresh}
                                  setDataProfile={dataProfile}
                                />
                              </Modal.Body>
                            </Modal>
                          </Flowbite>

                          <Flowbite theme={{ theme: customTheme }}>
                            <Button
                              color="delete"
                              className="w-5 h-5"
                              onClick={() => setOpenModal("form-elements")}
                            >
                              <svg
                                className="w-2 h-2 text-gray-800 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                              >
                                <path
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                              </svg>
                            </Button>
                            <Modal
                              show={openModal === "form-elements"}
                              size="lg"
                              popup
                              onClose={() => setOpenModal(undefined)}
                            >
                              <Modal.Header />
                              <Modal.Body>
                                <CardAddPhone
                                  setOpenModal={setOpenModal}
                                  setRefresh={setRefresh}
                                  setDataProfile={dataProfile}
                                />
                              </Modal.Body>
                            </Modal>
                          </Flowbite>
                        </div>
                      </div>
                    </li>
                    <li className="py-3 sm:py-4"></li>
                  </ul>
                </div>
              )
            )}
          </div>
        ))}
    </Card>
  );
};

export default CardPhone;
