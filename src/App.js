import React, { useState, useEffect } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
<<<<<<< HEAD
import { API, Storage } from 'aws-amplify';
=======
import { API } from "aws-amplify";
>>>>>>> 4b4b38fbd08cbad1e1c39096b40316828a856586
import {
  Button,
  Flex,
  Heading,
<<<<<<< HEAD
  Image,
=======
>>>>>>> 4b4b38fbd08cbad1e1c39096b40316828a856586
  Text,
  TextField,
  View,
  withAuthenticator,
<<<<<<< HEAD
} from '@aws-amplify/ui-react';
=======
} from "@aws-amplify/ui-react";
>>>>>>> 4b4b38fbd08cbad1e1c39096b40316828a856586
import { listNotes } from "./graphql/queries";
import {
  createNote as createNoteMutation,
  deleteNote as deleteNoteMutation,
} from "./graphql/mutations";

const App = ({ signOut }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    const apiData = await API.graphql({ query: listNotes });
    const notesFromAPI = apiData.data.listNotes.items;
<<<<<<< HEAD
    await Promise.all(
      notesFromAPI.map(async (note) => {
        if (note.image) {
          const url = await Storage.get(note.name);
          note.image = url;
        }
        return note;
      })
    );
=======
>>>>>>> 4b4b38fbd08cbad1e1c39096b40316828a856586
    setNotes(notesFromAPI);
  }

  async function createNote(event) {
    event.preventDefault();
    const form = new FormData(event.target);
<<<<<<< HEAD
    const image = form.get("image");
    const data = {
      name: form.get("name"),
      description: form.get("description"),
      image: image.name,
    };
    if (!!data.image) await Storage.put(data.name, image);
=======
    const data = {
      name: form.get("name"),
      description: form.get("description"),
    };
>>>>>>> 4b4b38fbd08cbad1e1c39096b40316828a856586
    await API.graphql({
      query: createNoteMutation,
      variables: { input: data },
    });
    fetchNotes();
    event.target.reset();
  }
<<<<<<< HEAD
  

  async function deleteNote({ id, name }) {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
    await Storage.remove(name);
=======

  async function deleteNote({ id }) {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
>>>>>>> 4b4b38fbd08cbad1e1c39096b40316828a856586
    await API.graphql({
      query: deleteNoteMutation,
      variables: { input: { id } },
    });
  }

  return (
    <View className="App">
      <Heading level={1}>My Notes App</Heading>
<<<<<<< HEAD
      
=======
>>>>>>> 4b4b38fbd08cbad1e1c39096b40316828a856586
      <View as="form" margin="3rem 0" onSubmit={createNote}>
        <Flex direction="row" justifyContent="center">
          <TextField
            name="name"
            placeholder="Note Name"
            label="Note Name"
            labelHidden
            variation="quiet"
            required
          />
          <TextField
            name="description"
            placeholder="Note Description"
            label="Note Description"
            labelHidden
            variation="quiet"
            required
          />
          <Button type="submit" variation="primary">
            Create Note
          </Button>
        </Flex>
      </View>
<<<<<<< HEAD
      <View
  name="image"
  as="input"
  type="file"
  style={{ alignSelf: "end" }}
/>
      <Heading level={2}>Current Notes</Heading>
      <View margin="3rem 0">
      {notes.map((note) => (
  <Flex
    key={note.id || note.name}
    direction="row"
    justifyContent="center"
    alignItems="center"
  >
    <Text as="strong" fontWeight={700}>
      {note.name}
    </Text>
    <Text as="span">{note.description}</Text>
    {note.image && (
      <Image
        src={note.image}
        alt={`visual aid for ${notes.name}`}
        style={{ width: 400 }}
      />
    )}
    <Button variation="link" onClick={() => deleteNote(note)}>
      Delete note
    </Button>
  </Flex>
))}
      </View>
      
=======
      <Heading level={2}>Current Notes</Heading>
      <View margin="3rem 0">
        {notes.map((note) => (
          <Flex
            key={note.id || note.name}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Text as="strong" fontWeight={700}>
              {note.name}
            </Text>
            <Text as="span">{note.description}</Text>
            <Button variation="link" onClick={() => deleteNote(note)}>
              Delete note
            </Button>
          </Flex>
        ))}
      </View>
>>>>>>> 4b4b38fbd08cbad1e1c39096b40316828a856586
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
};

export default withAuthenticator(App);