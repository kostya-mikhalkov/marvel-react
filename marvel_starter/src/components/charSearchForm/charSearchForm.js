import { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from 'yup';
import MarvelService from '../../service/MarvelService';
import './charSearchForm.scss';

const CharSearchForm = () => {
    const [char, setChar] = useState(null);

    useEffect(() => {
        console.log(char);
    }, [char]);

    const { getCharactersByName } = MarvelService();

    const updateChar = name => {
        getCharactersByName(name)
            .then(changeChar)
            .catch(err => setChar(null));
    };

    const changeChar = char => {
        setChar(char);
    };
    
    const resultMessage = !char ? null :
                          char.data.results.length < 1 ? <div className="char__search-error">Персонаж не найден</div> : <div className="char__search-error">Персонаж {char.data.results[0].name} найден</div>

    return (
        <Formik
            initialValues={{
                charName: ''
            }}
            validationSchema={Yup.object({
                charName: Yup.string()
                    .required("Required")
                    // .test('marvel-character', `Персонаж не найден`, async (value) => {
                    //     const response = await fetch(`https://gateway.marvel.com:443/v1/public/characters?name=${value}&apikey=916197d592e0c46ca82d7a622dfd9d5d`);
                    //     const data = await response.json();
                    //     return data.data.count > 0;
                    // })
            })}
            onSubmit={({ charName }) => updateChar(charName)}
        >
            {({ handleChange }) => (
                <Form>
                    <label className='char__search-label' htmlFor="charName">Or find a character by name:</label>
                    <div className="char__search-wrapper">
                        <Field
                            id="charName"
                            name="charName"
                            type="text"
                            onChange={handleChange}
                            placeholder="Enter name"
                        />
                        <div className='wrap'>
                            <button
                                type='submit'
                                className='button button__main'
                            >
                                <div className="inner">find</div>
                            </button>
                            {char && char.data && char.data.results.length !== 0 && (
                                <button className='button button__main'>
                                    <div className="inner">View</div>
                                </button>
                            )}
                        </div>
                    </div>
                    <FormikErrorMessage component="div" className="char__search-error" name="charName" />
                    {resultMessage}
                </Form>
            )}
        </Formik>
    );
};

export default CharSearchForm;
